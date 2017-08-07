import { get, omitBy } from 'lodash'
import { createReducer } from 'cape-redux'
import { merge, set, setIn } from 'cape-lodash'
import { HISTORY_CREATE, HISTORY_LEARN, HISTORY_RESTORE, HISTORY_UPDATE } from './actions'
import { getFirstIndex, getLastIndex, selectNextIndex } from './select'

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

// Remove all entries with index equal or more when creating new history.
// This is because the browser forward button goes away after back, back, create.
export function removeForwardItems(items, index) {
  return omitBy(items, item => item.index >= index)
}
export function createNewHistory({ key }, payload, index) {
  return {
    ...removeForwardItems(key, index),
    [payload.id]: {
      index,
      ...payload,
    },
  }
}
export function historyCreate(state, payload) {
  const key = createNewHistory(state, payload, selectNextIndex(state))
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
  return learnState(state, payload, set(state.key, payload.id, payload))
}
function historyRestore({ key, ...state }, { id, lastVisit }) {
  return {
    ...state,
    activeKey: id,
    key: {
      ...key,
      [id]: {
        ...key[id],
        lastVisit,
      },
    },
  }
}
export const getHistoryItem = (state, id) => get(state, ['key', id], {})

export function historyUpdate(state, payload) {
  return setIn(['key', payload.id], state, merge(getHistoryItem(payload.id, state), payload))
}
const reducers = {
  [HISTORY_CREATE]: historyCreate,
  [HISTORY_LEARN]: historyLearn,
  [HISTORY_RESTORE]: historyRestore,
  [HISTORY_UPDATE]: historyUpdate,
}
/**
 * This reducer will update the state with the most recent history key and location.
 */
export default createReducer(reducers, initState)
