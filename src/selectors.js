import { flow, get } from 'lodash/fp'
// import { find, flow, orderBy, reverse } from 'lodash/fp'
import { selectActiveKey } from './select'

export function activeLastMatch({ activeKey, lastKey }) {
  return activeKey === lastKey
}
export function browserHasHistory(windowHistory) {
  return windowHistory.state && windowHistory.state.id
}
export function isNewHistory(reduxHistory) {
  // const length = getLength(reduxHistory)
  // console.log(browserState.length, length)
  return activeLastMatch(reduxHistory)// && browserState.length === (length - 1)
}
export function keyMatch(reduxHistory, windowHistory) {
  return reduxHistory.activeKey === windowHistory.id
}
export const selectHistoryState = get('history')
export const selectActiveKeyDefault = flow(selectHistoryState, selectActiveKey)
