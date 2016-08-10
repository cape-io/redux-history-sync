import { createFromBrowser, restore, hashChange } from './actions'
import {
  browserHistory, getKeyIndex, historyMatch, isNewHistory, selectActiveKey, selectHistoryState,
} from './select'
import { locationSerialize } from './utils'

export function createPopListener(listener, reset) {
  return event => {
    console.log(event)
    if (event.state && event.state.key) {
      listener(event.state, event.type)
    } else if (reset) {
      reset()
    }
  }
}
// New history address bar URL. Browser won't attempt to load this.
// https://developer.mozilla.org/en-US/docs/Web/API/History_API
// The state object can be anything that can be serialized under 640k.
// reduxHistory is the full state.history object.
export function changeBrowserHistory(reduxHistory, changeState) {
  const activeHistory = browserHistory(reduxHistory)
  const locationStr = locationSerialize(activeHistory.location)
  return changeState(activeHistory, activeHistory.title, locationStr)
}

export function createHistoryListener(store, selectHistory, replaceState) {
  return windowHistory => {
    const historyState = selectHistory(store.getState())
    const storeHasKey = historyState.key[windowHistory.key]
    // Back/Forward after a page refresh.
    if (!storeHasKey) return store.dispatch(createFromBrowser(windowHistory))
    // Change came from here.
    if (historyState.activeKey === windowHistory.key) {
      return changeBrowserHistory(historyState, replaceState)
    }
    // Back/Forward
    return store.dispatch(restore(windowHistory.key, false))
  }
}
export function createHashListener(store, selectHistory, getHash) {
  return () => {
    const keyState = selectActiveKey(selectHistory(store.getState()))
    const stateHash = keyState.location.hash
    const browserHash = getHash()
    if (browserHash !== stateHash) {
      store.dispatch(hashChange(browserHash))
    }
  }
}
export function syncHistoryToStore(store, selectHistory, _window) {
  const replaceState = _window.history.replaceState.bind(_window.history)
  const handleHistoryChange = createHistoryListener(store, selectHistory, replaceState)
  function getHash() { return _window.location.hash }
  const hashChanges = createHashListener(store, selectHistory, getHash)
  // Listen for browser history forward/back changes.
  const handlePopState = createPopListener(handleHistoryChange, hashChanges)
  _window.addEventListener('popstate', handlePopState)
}

// Subscribe to store. Save new state to history key index.
export function syncStoreHistory(store, history, selectHistory) {
  function handleStoreChange() {
    const reduxHistory = selectHistory(store.getState())
    // Look for redux change.
    if (historyMatch(reduxHistory, history.state)) return undefined
    // Save new state to history key index.
    if (isNewHistory(reduxHistory, history.state)) {
      console.log('new history')
      return changeBrowserHistory(reduxHistory, history.pushState.bind(history))
    }
    // What is the index of the history key in the Redux store?
    const storeIndex = getKeyIndex(reduxHistory)
    // What is the index of the browser?
    const browserIndex = history.state.index
    // Tell browser to move forward or backward based on activeKey changes.
    // How far back or forward do we need to move the browser?
    const goBy = storeIndex - browserIndex
    console.log('Move browser history', goBy)
    history.go(goBy)
    return undefined
  }
  store.subscribe(handleStoreChange)
}

/**
 * This function saves and restores state with history navigation changes.
 * Externally available.
 */
export default function syncHistoryWithStore(store, _window, {
  selectHistory = selectHistoryState,
} = {}) {
  const historyState = selectHistory(store.getState())
  // Ensure that the reducer is mounted on the store and functioning properly.
  if (!historyState.activeKey) {
    // console.error(selectHistory(store.getState()))
    throw new Error(
      'Expected the history state activeKey to be available as `state.history` ' +
      'or as the custom expression you can specify as `selectHistoryState` ' +
      'in the `syncHistoryWithStore()` options. ' +
      'Ensure you have added the `historyReducer` to your store\'s ' +
      'reducers via `combineReducers` or whatever method you use to isolate ' +
      'your reducers.'
    )
  }
  // We want to make sure the window history state matches Redux initially.
  changeBrowserHistory(historyState, _window.history.replaceState.bind(history))
  // Sync Redux -> Browser History
  syncStoreHistory(store, _window.history, selectHistory)
  // Sync Browser History -> Redux
  syncHistoryToStore(store, selectHistory, _window)
}
