import test from 'tape'
import { parseUrl } from '../src'

// Confirm getLocationObject turns string into object.
// Confirm getLocationObject extra junk is filtered out.

// parseUrl()

test('parseUrl() should', assert => {
  assert.deepEqual(parseUrl(), {}, 'return empty object when no arg.')
  assert.deepEqual(parseUrl('/foo/bar#hash'), { pathname: '/foo/bar', hash: '#hash' })
  assert.end()
})
