import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import SecondApp from './SecondApp'
// import App from './App'
import configureStore from './Store'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={configureStore()}>
    <SecondApp />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
