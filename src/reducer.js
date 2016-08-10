import { HISTORY_CREATE, HISTORY_RESTORE } from './actions'

export const initialState = {
  activeKey: null,
  refresh: false,
  firstKey: null,
  lastKey: null,
  length: 0,
  key: {},
}
/**
 * This reducer will update the state with the most recent history key and location.
 */
export default function reducer(state = initialState, action) {
  if (!action.type || !action.payload) {
    return state
  }
  const { payload, type } = action
  const { index, key, title } = payload
  switch (type) {
    case HISTORY_RESTORE:
      return { ...state, activeKey: payload }
    case HISTORY_CREATE:
      return {
        firstKey: state.firstKey || key,
        activeKey: key,
        lastKey: key,
        length: state.length + 1,
        key: {
          ...state.key,
          [key]: {
            index: index || state.length,
            key,
            title,
            location: payload.location,
          },
        },
      }
    default:
      return state
  }
}
