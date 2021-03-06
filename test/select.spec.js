import test from 'tape'

import { historyState, state, state1 } from './mock'

import { stateFromBrowser } from '../src/initState'
import { initState } from '../src/reducer'
import {
  getKeyIndex, selectActive, selectFirstKey, getFirstIndex, getHistoryItems,
  selectActiveIndex, getActiveId, findDifferentPage,
} from '../src'

test('selectActive', (t) => {
  const learnedState = stateFromBrowser(historyState)
  t.equal(getHistoryItems(learnedState), learnedState.key, 'getHistoryItems')
  t.equal(getActiveId(learnedState), learnedState.activeKey, 'getActiveId')
  const activeKey = selectActive(learnedState)
  t.equal(activeKey.id, 'cra6ls', 'activeKey id')
  t.end()
})

test('selectActiveIndex', (t) => {
  selectActiveIndex(undefined, 0)
  selectActiveIndex(state1, 1)
  t.end()
})
test('selectFirstKey', (t) => {
  t.equal(selectFirstKey(initState), undefined)
  t.end()
})
test('getFirstIndex', (t) => {
  t.equal(getFirstIndex(initState), 0)
  t.end()
})

test('getKeyIndex', (t) => {
  const learnedState = stateFromBrowser(historyState)
  t.equal(getKeyIndex(learnedState), 1, 'activeKey index')
  t.end()
})
function isDifferentPage({ location: { pathname } }) {
  return !pathname.startsWith('/students/')
}
test('findDifferentPage', (t) => {
  const res = findDifferentPage(isDifferentPage)(state)
  t.equal(res.index, 2)
  t.equal(res.title, 'Students')
  t.end()
})
