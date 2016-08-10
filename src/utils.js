import identity from 'lodash/identity'
import pick from 'lodash/pick'
import pickBy from 'lodash/pickBy'

const hasWindowGlobal = typeof window === 'object'
const hasRequireGlobal = typeof require === 'function'

export function newId() {
  return Math.random().toString(36).substr(7)
}
/**
 * Serialize location object into a string like it shows up in the address bar.
 */
export function locationSerialize({ pathname = '', search = '', hash = '' }) {
  return `${pathname}${search}${hash}`
}
// Internal API.
export function getLocationObject(_location) {
  const loc = pick(_location,
    'pathname', 'hash', 'search', 'origin', 'protocol', 'port', 'hostname',
  )
  return pickBy(loc, identity)
}
export function parseUrlBrowser(string) {
  const url = window.document.createElement('a')
  url.href = string
  return getLocationObject(url)
}
export function parseUrlNode(string) {
  const { parse } = require('url')
  return getLocationObject(parse(string))
}
export function parseUrl(string) {
  if (!string) return {}
  if (hasWindowGlobal) return parseUrlBrowser(string)
  if (hasRequireGlobal) return parseUrlNode(string)
  throw new Error('No url processor function found.')
}
