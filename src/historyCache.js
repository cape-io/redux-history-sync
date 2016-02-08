import { selectHistoryState } from './reducer'

// This is just an example of how you can do it.
export default function createHistoryCache(selectHistory = selectHistoryState) {
  const index = {}
  function saveKeyState(activeKey, state) {
    index[activeKey] = state
  }
  function getKeyState(key, state) {
    if (!state) {
      return index[key]
    }
    return {
      ...index[key],
      history: selectHistory(state),
    }
  }
  return {
    saveKeyState,
    getKeyState,
  }
}
