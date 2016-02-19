import test from 'tape'
// import { jsdom } from 'jsdom'
// GLOBAL.window = jsdom('hello').defaultView

import { mapStateToProps } from '../src/Link'

import { location } from './mock'

test('mapStateToProps() should', assert => {
  assert.equal(mapStateToProps({}, location).href, '/foo#xk', 'return object with href string.')
  let props = { href: '/href', to: '/to' }
  assert.equal(mapStateToProps({}, props).href, '/href', 'pick href before to.')
  props = { to: '/to/play' }
  assert.equal(mapStateToProps({}, props).href, '/to/play', 'work with `to` prop.')
  assert.end()
})
