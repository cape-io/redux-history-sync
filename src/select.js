export function selectHistoryState(state) {
  return state.history
}

export function selectActiveKey({ activeKey, key }) {
  if (!key[activeKey]) throw new Error(`Missing history for key ${activeKey}.`)
  return key[activeKey]
}
export function browserHistory(reduxHistory) {
  return {
    ...selectActiveKey(reduxHistory),
    length: reduxHistory.length,
  }
}
export function historyMatch(reduxHistory, windowHistory) {
  if (!windowHistory || !windowHistory.key) throw new Error('Missing window.history.state')
  const activeKey = selectActiveKey(reduxHistory)
  return activeKey.key === windowHistory.key
}
export function lengthMatch(reduxHistory, windowHistory) {
  return reduxHistory.length === windowHistory.length
}
export function keyMatch(reduxHistory, windowHistory) {
  return reduxHistory.activeKey === windowHistory.key
}
export function getKeyIndex(reduxHistory) {
  return selectActiveKey(reduxHistory).index
}
export function selectActiveKeyDefault(state) {
  return selectActiveKey(selectHistoryState(state))
}

export function isNewHistory({ activeKey, lastKey, length }, browserState) {
  const isActiveLast = activeKey === lastKey
  return isActiveLast && browserState.length === (length - 1)
}
