export function selectHistoryState(state) {
  return state.history
}

export function selectActiveKey({ activeKey, key }) {
  if (!key[activeKey]) throw new Error('Missing browser history')
  return key[activeKey]
}
export function browserHistory(reduxHistory) {
  return {
    ...selectActiveKey(reduxHistory),
    length: reduxHistory.length,
  }
}
export function getKeyIndex(reduxHistory) {
  return selectActiveKey(reduxHistory).index
}
export function selectActiveKeyDefault(state) {
  return selectActiveKey(selectHistoryState(state))
}

export function isNewHistory({ activeKey, lastKey, length }, browserState) {
  return activeKey === lastKey && browserState.length === (length - 1)
}
