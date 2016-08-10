import { create, restore, hashChange } from './actions'
import {
  browserHistory, getKeyIndex, isNewHistory, selectActiveKey, selectHistoryState,
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

export function historyMatch(reduxHistory, windowHistory) {
  if (!windowHistory || !windowHistory.key || !reduxHistory.key) return false
  return reduxHistory.key === windowHistory.key
}
export function createBrowserHistory(reduxHistory, pushState) {
  const activeHistory = browserHistory(reduxHistory)
  return pushState(activeHistory, activeHistory.title, locationSerialize(location))
}
// Subscribe to store. Save new state to history key index.
export function syncStoreHistory(store, history, selectHistory) {
  function handleStoreChange() {
    const { go, pushState, state } = history
    const reduxHistory = selectHistory(store.getState())
    // Look for redux change.
    if (historyMatch(reduxHistory, state)) return undefined
    // Save new state to history key index.
    if (isNewHistory(reduxHistory, state)) return createBrowserHistory(reduxHistory, pushState)
    // What is the index of the history key in the Redux store?
    const storeIndex = getKeyIndex(reduxHistory)
    // What is the index of the browser?
    const browserIndex = state.index
    // Tell browser to move forward or backward based on activeKey changes.
    // How far back or forward do we need to move the browser?
    const goBy = storeIndex - browserIndex
    console.log('Move browser history', goBy)
    return go(goBy)
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
  // { index, key, title, location }
  const state = selectActiveKey(historyState)
  // New history address bar URL. Browser won't attempt to load this.
  const locationStr = locationSerialize(state.location)
  // https://developer.mozilla.org/en-US/docs/Web/API/History_API
  // The state object can be anything that can be serialized under 640k.
  // We want to make sure the window history state matches Redux initially.
  _window.history.replaceState(state, state.title, locationStr)
  // Sync Redux -> Browser History
  syncStoreHistory(store, _window.history, selectHistory)
  // Sync Browser History -> Redux
  syncHistoryToStore(store, selectHistory, _window)
}
