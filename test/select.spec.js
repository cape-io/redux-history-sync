import test from 'tape'

import { learnedState } from './mock'
import { getKeyIndex, selectActiveKey } from '../src'

test('selectActiveKey', t => {
  const activeKey = selectActiveKey(learnedState)
  t.equal(activeKey.id, 'cra6ls8zpg2glcp611yvi', 'activeKey id')
  t.end()
})
test('getKeyIndex', t => {
  t.equal(getKeyIndex(learnedState), 1, 'activeKey index')
  t.end()
})
