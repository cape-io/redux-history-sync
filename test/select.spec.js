import test from 'tape'

import { historyState } from './mock'

import { stateFromBrowser } from '../src/initState'
import { initState } from '../src/reducer'
import { getKeyIndex, selectActiveKey, selectFirstKey, getFirstIndex } from '../src'

test('selectFirstKey', t => {
  const emptyKey = { index: 0 }
  t.equal(selectFirstKey(initState, emptyKey), emptyKey)
  t.end()
})
test('getFirstIndex', t => {
  t.equal(getFirstIndex(initState), 0)
  t.end()
})
test('selectActiveKey', t => {
  const learnedState = stateFromBrowser(historyState)
  const activeKey = selectActiveKey(learnedState)
  t.equal(activeKey.id, 'cra6ls8zpg2glcp611yvi', 'activeKey id')
  t.end()
})
test('getKeyIndex', t => {
  const learnedState = stateFromBrowser(historyState)
  t.equal(getKeyIndex(learnedState), 1, 'activeKey index')
  t.end()
})
