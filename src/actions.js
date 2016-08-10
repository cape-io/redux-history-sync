import defaults from 'lodash/defaults'
import isString from 'lodash/isString'
import { getLocationObject, newKey, parseUrl } from './utils'

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
export function create(_location, title, key = null, pushState = true) {
  const loc = isString(_location) ? parseUrl(_location) : getLocationObject(_location)
  return {
    type: HISTORY_CREATE,
    payload: {
      title: title || '',
      location: defaults(loc, defaultLocation),
      key: key || newKey(),
    },
    meta: {
      pushState,
    },
  }
}
export function createFromBrowser(historyState) {
  return {
    type: HISTORY_CREATE,
    payload: historyState,
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
