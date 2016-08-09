// Public API
export {
  HISTORY_CREATE,
  HISTORY_RESTORE,
  create as createHistory,
  restore as restoreHistory,
} from './actions'
export historyMiddleware from './middleware'
export historyReducer, {
  selectActiveKey,
  selectActiveKeyDefault,
  selectHistoryState,
  getInitState,
} from './reducer'
export syncHistoryWithStore from './sync'
export { newKey, locationSerialize, parseUrl } from './utils'

export Link from './Link'
