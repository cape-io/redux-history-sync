import { flow } from 'lodash'
import { create, createFromBrowser } from './actions'
import reducer from './reducer'
import { browserHasHistory } from './selectors'

export function newReducer(action) {
  return reducer(undefined, action)
}
// defaultInitState(location, title)
export const defaultInitState = flow(create, newReducer)
export const stateFromBrowser = flow(createFromBrowser, newReducer)

export default function getInitState(location, title, history) {
  if (browserHasHistory(history)) return stateFromBrowser(history.state)
  return defaultInitState(location, title)
}
