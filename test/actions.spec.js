import test from 'tape'
import omit from 'lodash/omit'

import { create, createFromBrowser } from '../src/actions'
import { getLocationObject } from '../src/utils'
import { location, historyState } from './mock'

test('getLocationObject() should', assert => {
  const result = { pathname: '/foo', hash: '#xk' }
  assert.deepEqual(getLocationObject(location), result, 'remove extra props')
  assert.end()
})

test('create() action creator should', t => {
  const title = 'Kittens'
  const id = 'ookz9llerk9'
  const action = create(location, title, id)
  t.ok(action.payload.lastVisit && action.payload.lastVisit > 1470888200753)
  const result = {
    type: 'history/CREATE',
    payload: {
      title,
      location: { pathname: '/foo', hash: '#xk', search: '' },
      id,
    },
    meta: { pushState: true },
  }
  action.payload = omit(action.payload, 'lastVisit')
  t.deepEqual(action, result, 'create valid action.')
  t.end()
})

test('createFromBrowser', t => {
  const action = createFromBrowser(historyState)
  t.equal(action.payload, historyState, 'payload match')
  t.equal(action.type, 'history/HISTORY_LEARN', 'type match')
  t.end()
})
