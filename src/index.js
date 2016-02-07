// Public API
export {
  HISTORY_CREATE,
  HISTORY_RESTORE,
  create as createHistory,
  restore as restoreHistory
} from './actions'
export createHistoryCache from './historyCache'
export historyMiddleware from './middleware'
export historyReducer, {
  selectActiveKey,
  selectHistoryState,
  makeHydratable,
  getInitState
} from './reducer'
export syncHistoryWithStore from './sync'
export { newKey, locationSerialize } from './utils'

export Link from './Link'
