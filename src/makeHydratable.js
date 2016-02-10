import { HISTORY_RESTORE } from './actions'

export default function makeHydratable(reducer) {
  return function hydratableReducer(state, action) {
    switch (action.type) {
      case HISTORY_RESTORE:
        // Replace state with that of history.
        return reducer(action.state, action)
      default:
        return reducer(state, action)
    }
  }
}
