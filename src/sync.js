import { create, restore, hashChange } from './actions'
import { selectActiveKey, selectHistoryState } from './reducer'
import { locationSerialize } from './utils'

export function addPopListener(addEventListener, listener, reset) {
  function handlePopState(event) {
    if (event.state && event.state.key) {
      // console.log('state', event.type)
      listener(event.state, event.type)
    } else if (reset) {
      // console.log('reset')
      reset()
    }
  }
  addEventListener('popstate', handlePopState, false)
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
  addPopListener(_window.addEventListener, handleHistoryChange, hashChanges)
}

export function getKeyIndex(historyState, key) {
  return historyState.key[key].index
}

// Subscribe to store. Save new state to history key index.
export function syncStoreHistory(store, selectHistory, _window) {
  function handleStoreChange() {
    // Save new state to history key index.
    const state = store.getState()
    const historyState = selectHistory(state)
    const { activeKey } = historyState
    const browserKey = _window.history.state.key
    // Tell browser to move forward or backward based DevTools changes.
    if (browserKey !== activeKey) {
      // What is the index of the browser?
      const browserIndex = getKeyIndex(historyState, browserKey)
      // What is the index of the history key in the Redux store?
      const storeIndex = getKeyIndex(historyState, activeKey)
      // How far back or forward do we need to move the browser?
      const goBy = storeIndex - browserIndex
      console.log('Navigate browser', goBy)
      _window.history.go(goBy)
    }
  }
  store.subscribe(handleStoreChange)
}

/**
 * This function saves and restores state with history navigation changes.
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
  const state = selectActiveKey(historyState)
  const locationStr = locationSerialize(state.location)

  _window.history.replaceState(state, state.title, locationStr)
  syncStoreHistory(store, selectHistory, _window)
  syncHistoryToStore(store, selectHistory, _window)
}
