import test from 'tape'

import { getInitState } from '../src'
import { stateFromBrowser } from '../src/initState'
import { history, location, historyState } from './mock'

test('stateFromBrowser', (t) => {
  const { refresh } = stateFromBrowser(historyState)
  t.ok(refresh, 'refresh true')
  t.end()
})

test('getInitState() should have', (t) => {
  const title = 'Title thing'
  const { firstKey, activeKey, key } = getInitState(location, title, history)
  t.equal(firstKey, activeKey, 'matching firstKey and activeKey')
  t.equal(key[activeKey].title, title, 'title arg added as title prop')
  const keyLocation = { pathname: '/foo', hash: '#xk', search: '' }
  t.deepEqual(key[activeKey].location, keyLocation, 'location prop attached')
  const { refresh } = getInitState(location, title, { state: historyState })
  t.ok(refresh, 'refresh true')
  t.end()
})
