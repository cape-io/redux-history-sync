import { create, createFromBrowser } from './actions'
import reducer from './reducer'

export function defaultInitState(location, title) {
  const action = create(location, title)
  const state = reducer(undefined, action)
  return state
}
export function stateFromBrowser(historyState) {
  const action = createFromBrowser(historyState)
  const state = reducer(undefined, action)
  state.refresh = true
  return state
}
export default function getInitState(location, title, history) {
  if (history.state && history.state.key) return stateFromBrowser(history.state)
  return defaultInitState(location, title)
}
