import { create, restore, hashChange } from './actions'
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

export function syncHistoryToStore(store, selectHistory, _window) {
  function handleHistoryChange({ key, title, location }) {
    const historyState = selectHistory(store.getState())
    // Make sure the change isn't from DevTools.
    if (historyState.activeKey === key) {
      return
    }
    const storeHasKey = historyState.key[key]
    if (storeHasKey) {
      store.dispatch(restore(key, false))
    } else {
      // @TODO Check to see if we have a copy in chache.
      store.dispatch(create(location, title, key, false))
    }
  }
  function hashChanges() {
    const keyState = selectActiveKey(selectHistory(store.getState()))
    const stateHash = keyState.location.hash
    if (_window.location.hash !== stateHash) {
      store.dispatch(hashChange(_window.location.hash))
    }
  }
  // Listen for browser history forward/back changes.
  const handlePopState = createPopListener(handleHistoryChange, hashChanges)
  _window.addEventListener('popstate', handlePopState)
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

// Subscribe to store. Save new state to history key index.
export function syncStoreHistory(store, history, selectHistory) {
  function handleStoreChange() {
    const reduxHistory = selectHistory(store.getState())
    // Look for redux change.
    if (historyMatch(reduxHistory, history.state)) return undefined
    // Save new state to history key index.
    if (isNewHistory(reduxHistory, history.state)) {
      return changeBrowserHistory(reduxHistory, history.pushState.bind(history))
    }
    // What is the index of the history key in the Redux store?
    const storeIndex = getKeyIndex(reduxHistory)
    // What is the index of the browser?
    const browserIndex = history.state.index
    // Tell browser to move forward or backward based on activeKey changes.
    // How far back or forward do we need to move the browser?
    const goBy = storeIndex - browserIndex
    // console.log('Move browser history', goBy)
    return history.go(goBy)
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
