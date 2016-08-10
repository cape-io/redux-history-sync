import isFunction from 'lodash/isFunction'

import { HISTORY_CREATE, HISTORY_LEARN, HISTORY_RESTORE } from './actions'
import { getLength } from './select'

export const initialState = {
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
export function createNewHistory(historyKeys, { location, id, title }, index) {
  return {
    ...historyKeys,
    [id]: {
      index,
      location,
      id,
      title,
    },
  }
}
function historyCreate(state, payload) {
  const key = createNewHistory(state, payload, getLength(state))
  return createNewState(state, payload, key)
}
function historyLearn(state, payload) {
  const key = createNewHistory(state, payload, payload.index)
  return createNewState(state, payload, key)
}
const reducers = {
  [HISTORY_CREATE]: historyCreate,
  [HISTORY_LEARN]: historyLearn,
  [HISTORY_RESTORE]: (state, payload) => ({ ...state, activeKey: payload }),
}
/**
 * This reducer will update the state with the most recent history key and location.
 */
export default function reducer(state = initialState, action) {
  if (action.error || !action.type || !isFunction(reducers[action.type])) return state
  return reducers[action.type](state, action.payload)
}
