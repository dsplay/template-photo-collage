import { useContext, useEffect, useMemo, useState } from 'react';
import { GridGallery, LoaderContext, useTemplateIntVal } from '@dsplay/react-template-utils';
import './style.sass';

function Main() {
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const margin = useTemplateIntVal('margin', 0);
  const { tasksResults, tasksErrors } = useContext(LoaderContext);

  useEffect(() => {
    setHeight(document.getElementById('root').clientHeight);
    setWidth(document.getElementById('root').clientWidth);
  }, []);

  useEffect(() => {
    tasksErrors?.forEach((error) => {
      if (error) console.error('image failed to load, skipping it', error);
    });
  }, [tasksErrors]);

  // a failed image settles as undefined at that same index (see @dsplay/react-template-utils'
  // Loader) - drop it instead of showing a broken tile or crashing GridGallery's layout math
  const loadedImages = useMemo(
    () => tasksResults.filter((image) => image !== undefined),
    [tasksResults],
  );

  if (!height || !width) return null;

  return (
    <div className="main">
      <GridGallery
        images={loadedImages}
        margin={margin}
      />
    </div>
  );
}

export default Main;
