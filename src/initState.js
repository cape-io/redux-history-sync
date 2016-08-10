import { create, createFromBrowser } from './actions'
import reducer from './reducer'
import { browserHasHistory } from './select'

export function defaultInitState(location, title) {
  const action = create(location, title)
  const state = reducer(undefined, action)
  return state
}
export function stateFromBrowser(historyState) {
  const action = createFromBrowser(historyState)
  const state = reducer(undefined, action)
  return state
}
export default function getInitState(location, title, history) {
  if (browserHasHistory(history)) return stateFromBrowser(history.state)
  return defaultInitState(location, title)
}
