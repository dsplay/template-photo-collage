import React from 'react';
import {
  Loader,
  useTemplateBoolVal,
  useMedia,
  useScreenInfo,
} from '@dsplay/react-template-utils';
import Intro from './components/intro/intro';
import Main from './components/main/main';
import './app.sass';

const MIN_LOADING_DURATION = 2000;

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  const finalArray = array.slice();
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = finalArray[currentIndex];
    finalArray[currentIndex] = finalArray[randomIndex];
    finalArray[randomIndex] = temporaryValue;
  }

  return finalArray;
}

function App() {
  const {
    images,
    result: {
      data: {
        posts = [],
      } = {},
    } = {},
  } = useMedia();
  const result = posts.map(({
    media = [],
  }) => media.map(({ urls: { lg } }) => lg));

  let allMediaImages = [];
  result.forEach((mediaImages) => {
    allMediaImages = allMediaImages.concat(mediaImages);
  });

  const random = useTemplateBoolVal('random');
  const { screenFormat } = useScreenInfo();

  const imagesToShow = [...images, ...allMediaImages];

  // images to preload
  const imagesToLoad = [
    ...imagesToShow,
  ];

  // other tasks (Promises) to run during template intro
  let imageTasks = imagesToShow.map(async (imageSrc) => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = (e) => {
      const img = e.target;
      const { src, width, height } = img;
      resolve({ src, width, height });
    };

    image.onerror = (e) => {
      reject(e);
    };
  }));

  if (random) {
    imageTasks = shuffle(imageTasks);
  }

  return (
    <Loader
      placeholder={<Intro />}
      images={imagesToLoad}
      minDuration={MIN_LOADING_DURATION}
      tasks={imageTasks}
    >
      <div className={`app fade-in ${screenFormat}`}>
        <Main />
      </div>
    </Loader>
  );
}

export default App;
