import isUndefined from 'lodash/isUndefined'
import { initState } from './reducer'

export function selectHistoryState(state) {
  return state.history
}
export function getKey(keyType) {
  if (isUndefined(initState[keyType])) throw new Error('Invalid keyType.')
  return state => {
    const key = state[keyType]
    if (!key) throw new Error(`Missing history for ${keyType} key ${key}.`)
    return key
  }
}
export const selectActiveKey = getKey('activeKey')
export const selectFirstKey = getKey('firstKey')
export const selectLastKey = getKey('lastKey')
export function getIndex(selectKey) {
  return state => selectKey(state).index
}
export const getFirstIndex = getIndex(selectFirstKey)
export const getKeyIndex = getIndex(selectActiveKey)
export const getLastIndex = getIndex(selectLastKey)
export function selectActiveKeyDefault(state) {
  return selectActiveKey(selectHistoryState(state))
}
export function historyMatch(reduxHistory, windowHistory) {
  if (!windowHistory || !windowHistory.id) throw new Error('Missing window.history.state')
  const activeKey = selectActiveKey(reduxHistory)
  return activeKey.id === windowHistory.id
}
export function keyMatch(reduxHistory, windowHistory) {
  return reduxHistory.activeKey === windowHistory.id
}
export function getLength(reduxHistory) {
  if (!reduxHistory.lastKey) return 0
  return getLastIndex(reduxHistory) + 1
}
export function activeLastMatch({ activeKey, lastKey }) {
  return activeKey === lastKey
}
export function isNewHistory(reduxHistory, browserState) {
  const length = getLength(reduxHistory)
  return activeLastMatch(reduxHistory) && browserState.length === (length - 1)
}
export function browserHistory(reduxHistory) {
  return {
    ...selectActiveKey(reduxHistory),
    length: getLength(reduxHistory),
  }
}
export function lengthMatch(reduxHistory, windowHistory) {
  return getLength(reduxHistory) === windowHistory.length
}
export function browserHasHistory(windowHistory) {
  return windowHistory.state && windowHistory.state.id
}
