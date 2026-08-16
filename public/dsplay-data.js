var dsplay_config = {
  // config parameters
  locale: 'pt_br',
  orientation: window.innerHeight < window.innerWidth ? 'landscape' : 'portrait',
  // Android SDK version
  osVersion: 19,
  // DSPLAY App version code
  appVersion: 99,
};

var dsplay_media = {
  duration: 30000,

  images: [
    // source.unsplash.com (the old URLs here) was discontinued and now returns 503 for
    // everything - replaced with picsum.photos, which still proxies real Unsplash photos
    'https://picsum.photos/seed/collage01/800/600',
    'https://picsum.photos/seed/collage02/800/600',
    'https://picsum.photos/seed/collage03/800/600',
    'https://picsum.photos/seed/collage04/800/600',
    'https://picsum.photos/seed/collage05/800/600',
    'https://picsum.photos/seed/collage06/800/600',
    'https://picsum.photos/seed/collage07/800/600',
    'https://picsum.photos/seed/collage08/800/600',
    'https://picsum.photos/seed/collage09/800/600',
    'https://picsum.photos/seed/collage10/800/600',
    'https://picsum.photos/seed/collage11/800/600',
    'https://picsum.photos/seed/collage12/800/600',
    'https://picsum.photos/seed/collage13/800/600',
    'https://picsum.photos/seed/collage14/800/600',
    'https://picsum.photos/seed/collage15/800/600',
    'https://picsum.photos/seed/collage16/800/600',
    'https://picsum.photos/seed/collage17/800/600',
    'https://picsum.photos/seed/collage18/800/600',
    'https://picsum.photos/seed/collage19/800/600',
    'https://picsum.photos/seed/collage20/800/600',
  ], // Paths of all images

};

var dsplay_template = {
  random: "true",
  margin: "5"
};