import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import App from './App';
import configureStore from './Store';
import registerServiceWorker from './registerServiceWorker';

// let isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent);
// let isAPPBrowser = (/pciuser/i).test(navigator.userAgent);
// if(isAPPBrowser === true){
  ReactDOM.render(
      <Provider store={configureStore()}>
        <App />
      </Provider>,
      document.getElementById('root')
  );
// }else{
//   <App mes={"请使用微信或app打开！"}/>
//   document.getElementById('root')
// }


registerServiceWorker();
