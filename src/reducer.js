import isFunction from 'lodash/isFunction'

import { HISTORY_CREATE, HISTORY_LEARN, HISTORY_RESTORE } from './actions'
import { getFirstIndex, getLastIndex, getLength } from './select'

export const initState = {
  activeKey: null,
  firstKey: null,
  key: {},
  lastKey: null,
  refresh: false,
}
export function createNewState({ firstKey, refresh }, { id }, key) {
  return {
    activeKey: id,
    firstKey: firstKey || id,
    key,
    lastKey: id,
    refresh,
  }
}
export function createNewHistory({ key }, { location, id, title }, index) {
  return {
    ...key,
    [id]: {
      index,
      location,
      id,
      title,
    },
  }
}
export function historyCreate(state, payload) {
  const key = createNewHistory(state, payload, getLength(state))
  return createNewState(state, payload, key)
}
export function getLastKey(state, { id, index }) {
  if (!state.lastKey) return id
  const lastIndex = getLastIndex(state)
  if (index > lastIndex) return id
  return state.lastKey
}
export function getFirstKey(state, { id, index }) {
  if (!state.firstKey) return id
  const firstIndex = getFirstIndex(state)
  if (index < firstIndex) return id
  return state.firstKey
}
export function learnState(state, payload, key) {
  return {
    activeKey: payload.id,
    firstKey: getFirstKey(state, payload),
    key,
    lastKey: getLastKey(state, payload),
    refresh: true,
  }
}
function historyLearn(state, payload) {
  const key = createNewHistory(state, payload, payload.index)
  return learnState(state, payload, key)
}
const reducers = {
  [HISTORY_CREATE]: historyCreate,
  [HISTORY_LEARN]: historyLearn,
  [HISTORY_RESTORE]: (state, payload) => ({ ...state, activeKey: payload }),
}
/**
 * This reducer will update the state with the most recent history key and location.
 */
export default function reducer(state = initState, action) {
  if (action.error || !action.type || !isFunction(reducers[action.type])) return state
  return reducers[action.type](state, action.payload)
}
