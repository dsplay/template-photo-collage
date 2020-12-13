![DSPLAY - Digital Signage](https://developers.dsplay.tv/assets/images/dsplay-logo.png)

# DSPLAY - React Template Boilerplate

This is a [React](https://reactjs.org/) boilerplate for building [HTML-based templates](https://developers.dsplay.tv/docs/html-templates) for [DSPLAY - Digital Signage](https://dsplay.tv/) platform.

You can use this project as a skeleton for creating a new HTML Template with React. If you prefer to use another JS library, check the [other boilerplates](https://developers.dsplay.tv/docs/html-templates/boilerplates/) available.

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Getting started

```
git clone https://github.com/dsplay/template-boilerplate-react.git my-awesome-template
cd my-awesome-template
rm -rf .git
npm i
npm start
```


## `dsplay-data.js`

In this boilerplate project, `dsplay-data.js` is located at `public` folder.

> During template development, `dsplay-data.js` will be just a mock with your test data. The DSPLAY Player App will automatically replace this file with real content at runtime.

### Using `dsplay-data.js` vars in template

The easiest way to access `dsplay-data.js` values in your project is by using the support library `@dsplay/react-template-utils` (already included in this boilerplate). 

Here is a small snippet showing how to get values inside a React component:

```jsx
// App.jsx
import React from 'react';
import {
  FitText,
  useMedia,
  useConfig,
  useTemplate,
  useTemplateVal,
  useTemplateBoolVal,
  useTemplateIntVal,
  useTemplateFloatVal,
  useScreenInfo,
} from '@dsplay/react-template-utils';
import './App.css';

const { duration } = media;
const { orientation, locale } = config;

function App() {
  const config = useConfig();
  const media = useMedia();
  const template = useTemplate();
  const { screenFormat } = useScreenInfo();

  const { locale } = config;
  const { duration } = media;
  return (
    <div className="App">
      <h1>DSPLAY Template</h1>
      <h2>Raw Values</h2>
      <div>
        <p>Config:</p>
        <pre>{JSON.stringify(config, null, 4)}</pre>

        <p>Media:</p>
        <pre>{JSON.stringify(media, null, 4)}</pre>

        <p>Template:</p>
        <pre>{JSON.stringify(template, null, 4)}</pre>
      </div>
      <h2>Configuration Values Examples</h2>
      <div>
        <p>
          Locale:
          <span class="val">{locale}</span>
        </p>
      </div>
      <h2>Media Values Examples</h2>
      <div>
        <p>
            Duration:
          <span class="val">{duration}</span>
        </p>
      </div>
      <h2>Custom Template Var Examples</h2>
      <div>
        <p>
          String:
          <span className="val">{useTemplateVal('title', 'Default Value')}</span>
        </p>
        <p>
          Boolean:
          <span className="val">{useTemplateBoolVal('expanded', true) ? 'Yes' : 'No'}</span>
        </p>
        <p>
          Int:
          <span className="val">{useTemplateIntVal('page_size', 10)}</span>
        </p>
        <p>
          Double:
          <span className="val">{useTemplateFloatVal('rate', 0.75)}</span>
        </p>
        <p>
          Image:
          <img className="val" alt="" src={useTemplateVal('logo')} />
        </p>
        <p>
          ScreenFormat:
          <span className="val">{screenFormat}</span>
        </p>
      </div>
    </div>
  );
}


export default App;
```

## Test assets

To use test assets (images, videos, etc) during development time you can put them in the `public/test-assets` folder and then reference them in `dsplay-data.js` using their relative path.
```js
// dsplay-data.js

// ... other objects

var dsplay_template {
    //... other fields
    my_image: '../test-assets/my-image.png',
}
```

> The `public/test-assets` folder is automatically excluded from the release build.

## Packing (release build)

To create a release build of the template, ready to be uploaded to DSPLAY, just run:

```
npm run zip
```

It will generate a `template.zip` file ready to be deployed to [DSPLAY Web Manager](https://manager.dsplay.tv/template/create)

## More

The see more about DSPLAY HTML Templates, visit: https://developers.dsplay.tv/docs/html-templates