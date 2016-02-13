import { getLocationObject, newKey } from './utils'

export const HISTORY_CREATE = '@@history/CREATE'
export const HISTORY_RESTORE = '@@history/RESTORE'
export const HISTORY_HASH_CHANGE = '@@history/HISTORY_HASH_CHANGE'

/**
 * This action should be dispatched when you want to exchange state with a previous history.
 */
export function restore(key, pushState = true) {
  return {
    type: HISTORY_RESTORE,
    payload: key,
    meta: {
      pushState,
    },
  }
}
const defaultLocation = {
  pathname: '',
  hash: '',
  search: '',
}

/**
 * This action should be dispatched when you want a new history entry.
 */
export function create(location, title, key = null, pushState = true) {
  return {
    type: HISTORY_CREATE,
    payload: {
      title: title || '',
      location: getLocationObject(location, defaultLocation),
      key: key || newKey(),
    },
    meta: {
      pushState,
    },
  }
}

/**
 * Currently this is private. Called when user changes hash in address bar.
 */
export function hashChange(hash) {
  return {
    type: HISTORY_HASH_CHANGE,
    payload: {
      hash,
      key: newKey(),
    },
  }
}
