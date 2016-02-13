import defaults from 'lodash/defaults'
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
  const loc = pick(_location,
    'pathname', 'hash', 'search', 'origin', 'protocol', 'port', 'hostname',
  )
  return defaults(loc, defaultLocation)
}
