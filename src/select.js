import { partial, partialRight } from 'lodash'
import { add, find, flow, get, getOr, orderBy, reverse } from 'lodash/fp'
import { getSelect } from 'cape-select'
import { createSelector } from 'reselect'

// NOTE: These all act on history state directly. Redux slice needs to be selected first.

export const getHistoryItems = get('key')
export const getActiveId = get('activeKey')
export const getFirstId = get('firstKey')
export const getLastId = get('lastKey')

export const getHistoryItem = partial(getSelect, getHistoryItems)

export const selectActive = getHistoryItem(getActiveId)
export const selectActiveKey = selectActive
export const selectFirst = getHistoryItem(getFirstId)
export const selectFirstKey = selectFirst
export const selectLast = getHistoryItem(getLastId)
export const selectLastKey = selectLast

export const getIndex = partialRight(flow, getOr(0, 'index'))

export const selectActiveIndex = getIndex(selectActive)
export const getKeyIndex = selectActiveIndex
export const getFirstIndex = getIndex(selectFirst)
export const getLastIndex = getIndex(selectLast)

export const selectPrevIndex = flow(selectActiveIndex, add(-1))
export const selectNextIndex = flow(selectActiveIndex, add(1))
export const getLength = selectNextIndex

export function historyMatch(reduxHistory, windowHistory) {
  if (!windowHistory || !windowHistory.id) throw new Error('Missing window.history.state')
  const activeKey = selectActiveKey(reduxHistory)
  return activeKey.id === windowHistory.id
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
export const sortedHistoryItems = createSelector(
  getHistoryItems,
  orderBy('index', 'asc')
)
export const sortedHistoryItemsDesc = flow(sortedHistoryItems, reverse)
export const selectPrevious = getSelect(sortedHistoryItems, selectPrevIndex)
export function findDifferentPage(isDifferentFunc) {
  return flow(sortedHistoryItemsDesc, find(isDifferentFunc))
}
