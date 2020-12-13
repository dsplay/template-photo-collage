import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import './index.sass';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
