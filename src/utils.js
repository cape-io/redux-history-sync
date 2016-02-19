import defaults from 'lodash/defaults'
import isString from 'lodash/isString'
import pick from 'lodash/pick'

export function newKey() {
  return Math.random().toString(36).substr(7)
}
/**
 * Serialize location object into a string like it shows up in the address bar.
 */
export function locationSerialize({ pathname = '', search = '', hash = '' }) {
  return `${pathname}${search}${hash}`
}

export function getLocationObject(_location, defaultLocation = {}) {
  const loc = isString(_location) ? { pathname: _location } : pick(_location,
    'pathname', 'hash', 'search', 'origin', 'protocol', 'port', 'hostname',
  )
  return defaults(loc, defaultLocation)
}

export function parseUrl(string) {
  if (!string) {
    return {}
  }
  const url = window.document.createElement('a')
  url.href = string
  return getLocationObject(url)
}
