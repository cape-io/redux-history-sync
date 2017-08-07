import { defaults, isString, now } from 'lodash'
import { getLocationObject, newId, parseUrl } from './utils'

/**
 * This action should be dispatched when you want to exchange state with a previous history.
 */
export const HISTORY_RESTORE = 'history/RESTORE'
export function restore(id, pushState = true) {
  return {
    type: HISTORY_RESTORE,
    payload: {
      id,
      lastVisit: now(),
    },
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
function getLocation(loc) {
  return defaults(isString(loc) ? parseUrl(loc) : getLocationObject(loc), defaultLoc)
}

/**
 * This action should be dispatched when you want a new history entry.
 */
export const HISTORY_CREATE = 'history/CREATE'
export function create(_location, title, id = null, pushState = true) {
  return {
    type: HISTORY_CREATE,
    payload: {
      lastVisit: now(),
      title: title || '',
      location: getLocation(_location),
      id: id || newId(),
    },
    meta: {
      pushState,
    },
  }
}

export const HISTORY_UPDATE = 'history/UPDATE'
export function update(id, _location, title) {
  return {
    type: HISTORY_UPDATE,
    payload: {
      id,
      title: title || '',
      location: getLocation(_location),
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
