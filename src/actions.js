import defaults from 'lodash/defaults'
import isString from 'lodash/isString'
import { getLocationObject, newId, parseUrl } from './utils'

/**
 * This action should be dispatched when you want to exchange state with a previous history.
 */
export const HISTORY_RESTORE = 'history/RESTORE'
export function restore(key, pushState = true) {
  return {
    type: HISTORY_RESTORE,
    payload: key,
    meta: {
      pushState,
    },
  }
}

const defaultLoc = {
  pathname: '',
  hash: '',
  search: '',
}

/**
 * This action should be dispatched when you want a new history entry.
 */
export const HISTORY_CREATE = 'history/CREATE'
export function create(_location, title, id = null, pushState = true) {
  const loc = isString(_location) ? parseUrl(_location) : getLocationObject(_location)
  return {
    type: HISTORY_CREATE,
    payload: {
      lastVisit: Date.now(),
      title: title || '',
      location: defaults(loc, defaultLoc),
      id: id || newId(),
    },
    meta: {
      pushState,
    },
  }
}

export const HISTORY_LEARN = 'history/HISTORY_LEARN'
export function createFromBrowser(historyState) {
  return {
    type: HISTORY_LEARN,
    payload: historyState,
  }
}

/**
 * Currently this is private. Called when user changes hash in address bar.
 */
export const HISTORY_HASH_CHANGE = 'history/HISTORY_HASH_CHANGE'
export function hashChange(hash) {
  return {
    type: HISTORY_HASH_CHANGE,
    payload: {
      hash,
      id: newId(),
    },
  }
}
