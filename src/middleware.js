import { locationSerialize } from './utils'
import { HISTORY_HASH_CHANGE, create } from './actions'
import { selectActiveKey, selectHistoryState } from './select'

/**
 * This middleware:
 *   Calls pushState() with location string on HISTORY_CREATE.
 */
export default function middleware(history, selectHistory = selectHistoryState) {
  return store => next => action => {
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
