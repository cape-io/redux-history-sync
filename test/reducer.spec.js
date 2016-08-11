import test from 'tape'

import { historyState } from './mock'
import { createFromBrowser } from '../src/actions'
import reducer, {
  createNewHistory, getFirstKey, initState, learnState, removeForwardItems,
} from '../src/reducer'

test('reducer', t => {
  const state = {}
  t.equal(reducer(state, {}), state)
  t.end()
})
test('removeForwardItems', t => {
  const key = {
    a: { index: 0, id: 'a' },
    b: { index: 1, id: 'b' },
    c: { index: 2, id: 'c' },
  }
  t.deepEqual(removeForwardItems(key, 1), { a: key.a })
  t.end()
})
const payload = { location: { pathname: '/foo' }, id: 'abc123', title: 'Title', index: 1 }
const payload2 = { location: { pathname: '/bat' }, id: 'ab12', title: 'Title', lastVisit: 100 }
test('createNewHistory', t => {
  const key = createNewHistory(initState, payload, payload.index)
  t.equal(key.abc123.id, payload.id, 'id')
  t.equal(key.abc123.index, 1, 'index')
  const key2 = createNewHistory({ key }, payload2, 1)
  t.deepEqual(key2, { ab12: { ...payload2, index: 1 } })
  t.end()
})
test('getFirstKey', t => {
  const id = 'abc1234'
  t.equal(getFirstKey(initState, { id, index: 1 }), id, 'empty return payload id')
  t.end()
})
test('learnState', t => {
  const key = createNewHistory(initState, payload, payload.index)
  const state = learnState(initState, payload, key)
  t.ok(state.refresh, 'refresh')
  t.equal(state.firstKey, payload.id, 'firstKey')
  t.equal(state.lastKey, payload.id, 'lastKey')
  t.equal(state.activeKey, payload.id, 'activeKey')
  t.end()
})

test('HISTORY_LEARN', t => {
  const action = createFromBrowser(historyState)
  const state = reducer(undefined, action)
  t.ok(state.refresh, 'refresh')
  t.end()
})
