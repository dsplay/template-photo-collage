# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## What this project is

The DSPLAY **Photo Collage** template — a [React](https://reactjs.org/) app built with [Vite](https://vitejs.dev/) that lays out a full-screen justified grid of images from the current media source. Requires Node.js 22.22.2+, 24.15.0+, or 26+ (see `.nvmrc`). See README.md for the template's variables.

## Directory structure

```
index.html                 <-- Vite entry point
vite.config.js             <-- includes @dsplay/template-manifest's Vite plugin (see below)
public/
  dsplay-data.js            <-- mock DSPLAY data for local development
  test-assets/              <-- dev-only assets, excluded from the release build
src/
  index.jsx                 <-- React entry point
  setup-tests.js             <-- Vitest setup (referenced by vite.config.js)
  images/loader.gif          <-- intro spinner asset
  components/
    app/                      <-- top-level component (loader, images-to-preload, grid shuffle)
    main/                     <-- renders GridGallery with the preloaded images
    intro/                    <-- loading placeholder
build.sh                    <-- zips the Vite build output into template.zip
```

## File and folder naming

- **kebab-case everywhere** in `src/` (and anywhere else in this repo we author ourselves) — folders, JS/JSX files, Sass files, test files. Doesn't apply to files whose name is a fixed convention from tooling (`package.json`, `vite.config.js`, etc.) or to vendored/third-party assets we don't control the naming of.
- **Author styles as `.sass` (indented syntax), never `.css`** — this applies to our own hand-authored stylesheets specifically; it does not apply to vendored or tool-generated CSS we don't hand-edit (a self-hosted Google Fonts `@font-face` file, a Flaticon/IcoMoon icon-font export, a vendored library like Bootstrap) — those stay `.css` since they'd be regenerated/replaced wholesale, not edited by hand. `.sass`'s indented syntax has no braces or semicolons — converting a `.css` file means rewriting it to the indented syntax, not just renaming it.
- **Every component gets its own folder with an `index.jsx`.** For a simple component, `index.jsx` *is* the component. For one that grows into several files, `index.jsx` becomes a barrel re-exporting the folder's public API.
- **Always import a component by its folder, never by reaching into `index`** — `import Main from '../main'`, never `.../main/index`.
- Enforced automatically by ESLint's `unicorn/filename-case` rule for the naming half of this; the folder+`index.jsx`+import-by-folder structure is not machine-checked, just convention.

## Package identity

`package.json`'s `"name"` must identify this template, not the boilerplate it was cloned from — see `template-boilerplate-react`'s AGENTS.md for the full convention. This template's is `dsplay-template-photo-collage`.

## README structure

Every DSPLAY template's `README.md` follows the same skeleton (see `template-boilerplate-react`'s AGENTS.md for the full reference copy):

1. Logo badge + `# DSPLAY - <Name>` + a one/two-sentence description.
2. *(optional, only if the template has more than one visual arrangement)* **Features**.
3. *(optional, only if appearance changes meaningfully by screen format)* **Supported screen formats**.
4. **Template variables** — a `Key | Type | Default | Description` table, ending with the "register as Template Vars in the DSPLAY CMS" reminder.
5. **Local development**, 6. *(optional)* **For developers**, 7. **Test assets** / **Packing (release build)** / **Maintaining dependencies** (-> AGENTS.md) / **More**.

Skip a numbered section entirely rather than including it empty.

## Internationalization (i18n)

This template has **no static, developer-authored UI text** — the entire screen is a photo grid built from media source images plus a loading spinner, no labels/messages of its own. There is deliberately no `react-i18next`/`i18next.js` wiring; a prior `src/i18n.js` here was fully orphaned dead code (never imported by any component) carrying the boilerplate demo's leftover `Title`/`Config`/`Media`/`Orientation` keys, and was removed rather than kept "just in case". If you add UI text that needs translating, follow the convention documented in `template-boilerplate-react`'s AGENTS.md (key = English text itself, `en` self-mapped, minimum `en`/`pt`/`es`/`it`/`de`/`nl`) rather than resurrecting the old file.

## Runtime model

- `public/dsplay-data.js` defines `dsplay_config`/`dsplay_media`/`dsplay_template` mock globals used only in **development**. `build.sh` blanks its content in the production build — the DSPLAY Android app injects the real `window.DSPLAY.getData()` before any script runs.
- Images come from `dsplay_media`, not a `dsplay_template` variable: `useMedia()` reads a plain `images` array (URLs) and/or a `result.data.posts[].media[]` structure (each item's `cached_media_url` or `urls.lg`) — the latter shape matches a connected social/Instagram-style media source. Both are merged and preloaded by `src/components/app/index.jsx` before the grid renders.
- `@dsplay/react-template-utils` exposes `GridGallery` (the justified-grid layout, added in `5.2.0` — ported from the now-retired `@dsplay/react-template-components`), `Loader`/`LoaderContext`, `useMedia`, `useTemplateBoolVal`/`useTemplateIntVal`, and `useScreenInfo`.
- **Always read template data through `@dsplay/react-template-utils`'s hooks (`useTemplateVal`/`useTemplateBoolVal`/`useTemplateIntVal`/`useTemplateFloatVal`/`useTemplate()`/`useMedia()`/`useConfig()`), called inside the function component that uses the value — never call `@dsplay/template-utils`'s vanilla `tval`/`tbval`/`tival`/`tfval`/`config`/`media`/`template` directly, and never read them at module scope as a one-time constant. `@dsplay/template-utils` should not appear as a direct dependency in this template's `package.json` (it's still pulled in transitively via `@dsplay/react-template-utils`).
- `src/components/app/index.jsx` optionally shuffles the image order via the `random` template variable before handing them to `Loader` as `tasks` (each task resolves the image's natural width/height, which `GridGallery` needs to lay out rows); `src/components/main/index.jsx` reads the resolved results from `LoaderContext` and renders `GridGallery`.
- **Error handling**: an image that fails to load (404, network error, ...) rejects its task; `Loader` (`@dsplay/react-template-utils@5.2.1`+) no longer hangs the intro on this, it settles that index as `undefined` in `tasksResults` with the failure reason in the parallel `tasksErrors` array. `src/components/main/index.jsx` filters `undefined` entries out before handing the array to `GridGallery` (which would otherwise crash reading `.width` off it) and `console.error`s each `tasksErrors` entry for visibility - a broken image is silently dropped from the collage rather than shown as a broken tile or blocking the rest from rendering.

## Template variable manifest

`vite.config.js` registers `@dsplay/template-manifest`'s Vite plugin, which on every build statically scans `src/` for `tval`/`useTemplateVal`-style reads and captures `public/dsplay-data.js` as example data, writing `template-variables.json` + `template-example-data.json` into the build output — and therefore into `template.zip` (`npm run zip` runs `build.sh`, which zips the whole build output). The DSPLAY CMS reads these two files to auto-detect a template's variables and seed default preview values, instead of requiring manual registration. See [@dsplay/template-manifest](https://www.npmjs.com/package/@dsplay/template-manifest) for exactly what it detects. Note this only scans `dsplay_template` reads — the `images`/`posts` media source described above is `dsplay_media` and intentionally doesn't show up here.

## Commands

- `npm start` — dev server (Vite).
- `npm run build` — production build (runs the linter first via the `prebuild` script).
- `npm test` / `npm run test:watch` — Vitest.
- `npm run linter` / `npm run linter:fix` — ESLint on `src`.
- `npm run zip` — builds, then runs `build.sh` to produce `template.zip` ready for the [DSPLAY Web Manager](https://manager.dsplay.tv/template/create). `build/` and `template.zip` are gitignored.

## Dependency management

Regular npm dependencies, not vendored files — `npm outdated` / `npm update` for in-range bumps. For an out-of-range (typically major) bump, apply it deliberately and verify `npm start`, `npm run build`, and `npm test` still work before committing.

`@dsplay/react-template-components` was removed during the 2026 Vite/React 19 migration — its only feature this template used, `GridGallery`, was ported into `@dsplay/react-template-utils@5.2.0` (that library was a stalled TypeScript rewrite attempt; see `react-template-utils`'s own history for the full reasoning). Import `GridGallery` from `@dsplay/react-template-utils` going forward, not the old package.

### Known pending bump: ESLint 9 -> 10

`eslint`/`@eslint/js` are pinned to `^9.39.5` (latest is `10.x`). Bumping them currently fails on peer dependency conflicts: `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, and `eslint-plugin-react` haven't declared ESLint 10 support yet as of 2026-08-12 — they're still the actively-maintained canonical packages, not abandoned or superseded, just lagging behind the major. `eslint-plugin-react-hooks` already supports it. `eslint-plugin-unicorn` is pinned to `65.0.1` for the same reason (`66.0.0+` requires ESLint `>=10.4`). Don't force this with `--legacy-peer-deps` — re-check peer ranges periodically and bump all of them together once the laggards catch up.

## Commit messages

Every commit title must start with an emoji, followed by a short, imperative summary — e.g. `⬆️ upgrading deps`.

- The human maintainer uses [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) for manual commits, so gitmoji conventions (`✨` feature, `🐛` fix, `⬆️` upgrade deps, `♻️` refactor, `🔥` remove code, `📝` docs) are a good default.
- Agents are not required to stick to the official gitmoji list — pick whichever emoji best represents the actual change in that commit, as long as it's placed at the start of the title.
