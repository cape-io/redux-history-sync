import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import {
  syncHistoryWithStore,
  createHistoryCache,
  historyMiddleware,
  makeHydratable,
  historyReducer,
  getInitState,
} from 'react-router-redux'

import App from './AppContainer'

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
  >
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

// Create an object with two methods. getKeyStore and saveKeyStore.
const historyCache = createHistoryCache()

const reducer = combineReducers({
  history: historyReducer,
})

const store = createStore(
  makeHydratable(reducer),
  {
    history: getInitState(window.location, window.document.title),
  },
  compose(
    applyMiddleware(historyMiddleware(window.history, historyCache)),
    DevTools.instrument()
  )
)
syncHistoryWithStore(store, window, historyCache)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)
