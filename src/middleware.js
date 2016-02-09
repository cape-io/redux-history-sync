import merge from 'lodash/merge'

import { locationSerialize } from './utils'
import { HISTORY_CREATE, HISTORY_RESTORE, HISTORY_HASH_CHANGE, create } from './actions'
import { selectActiveKey, selectHistoryState } from './reducer'
/**
 * This middleware:
 *   Calls pushState() with location string on HISTORY_CREATE.
 *   Populates HISTORY_RESTORE action with state value.
 */
export default function middleware(history, { getKeyState }, selectHistory = selectHistoryState) {
  return store => next => action => {
    if (action.type === HISTORY_CREATE && action.meta.pushState) {
      const { key, title, location } = action.payload
      const newLocationString = locationSerialize(location)
      history.pushState({ key, location, title }, title, newLocationString)
      return next(merge(action, { meta: { pushedState: true } }))
    }
    if (action.type === HISTORY_RESTORE) {
      const activeKey = action.payload
      const state = getKeyState(activeKey, store.getState())
      return next({
        ...action,
        state,
      })
    }
    // A new history entry was added to browser, [sigh] mirror in Redux.
    if (action.type === HISTORY_HASH_CHANGE) {
      // We need all the info from current key.
      const { location, title } = selectActiveKey(selectHistory(store.getState()))
      const { hash, key } = action.payload
      // Overwrite old location hash with new one.
      location.hash = hash
      // The location string that will be replaced in the browser.
      // Should be same as it already is.
      const newLocationString = locationSerialize(location)
      history.replaceState({ key, location, title }, title, newLocationString)
      const newAction = create(location, title, key, false)
      newAction.meta.hashChange = true
      newAction.meta.replacedState = true
      return next(newAction)
    }
    return next(action)
  }
}
