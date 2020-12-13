import React, { useContext, useEffect, useState } from 'react';
import { GridGallery } from '@dsplay/react-template-components';
import { LoaderContext, useTemplateIntVal } from '@dsplay/react-template-utils';
import '@dsplay/react-template-components/dist/styles.css';
import './main.sass';

function Main() {
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const margin = useTemplateIntVal('margin', 0);
  const { tasksResults } = useContext(LoaderContext);

  useEffect(() => {
    setHeight(document.getElementById('root').clientHeight);
    setWidth(document.getElementById('root').clientWidth);
  }, []);

  if (!height || !width) return null;

  return (
    <div className="main">
      <GridGallery
        images={[...tasksResults]}
        margin={margin}
      />
    </div>
  );
}

export default Main;
