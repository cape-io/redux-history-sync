import test from 'tape'
import { create, createFromBrowser } from '../src/actions'
import { getLocationObject } from '../src/utils'
import { location, historyState } from './mock'

test('getLocationObject() should', assert => {
  const result = { pathname: '/foo', hash: '#xk' }
  assert.deepEqual(getLocationObject(location), result, 'remove extra props')
  assert.end()
})

test('create() action creator should', assert => {
  const title = 'Kittens'
  const id = 'ookz9llerk9'
  const result = {
    type: 'history/CREATE',
    payload: {
      title,
      location: { pathname: '/foo', hash: '#xk', search: '' },
      id,
    },
    meta: { pushState: true },
  }
  assert.deepEqual(create(location, title, id), result, 'create valid action.')
  assert.end()
})

test('createFromBrowser', t => {
  const action = createFromBrowser(historyState)
  t.equal(action.payload, historyState, 'payload match')
  t.equal(action.type, 'history/HISTORY_LEARN', 'type match')
  t.end()
})
