import { flow } from 'lodash'
import reducer from '../src/reducer'
import { defaultInitState } from '../src/initState'
import { create } from '../src/actions'

export const location = {
  some: 'stuff',
  more: 'things',
  hash: '#xk',
  pathname: '/foo',
}
export const history = {
  state: null,
}
export const historyState = {
  activeKey: 'cra6ls',
  firstKey: 'cra6ls',
  lastKey: 'cra6ls',
  index: 1,
  id: 'cra6ls',
  location: {
    hash: '',
    hostname: 'localhost',
    origin: 'http://localhost:3000',
    pathname: '/',
    port: '3000',
    protocol: 'http:',
    search: '',
  },
  refresh: false,
}
export const refreshState = {
  activeKey: 'do02vb',
  firstKey: 'do02vb',
  key: {
    do02vb: {
      index: 3,
      lastVisit: 1502067346532,
      location: {
        pathname: '/sam',
        origin: 'http://localhost:3000',
        protocol: 'http:',
        port: '3000',
        hostname: 'localhost',
        hash: '',
        search: '',
      },
      id: 'do02vb',
      title: '',
    },
  },
  lastKey: 'do02vb',
  refresh: true,
}
export const backButtonHistoryLearn = {
  type: 'history/HISTORY_LEARN',
  payload: {
    index: 2,
    lastVisit: 1502067310869,
    location: {
      pathname: '/sd',
      origin: 'http://localhost:3000',
      protocol: 'http:',
      port: '3000',
      hostname: 'localhost',
      hash: '',
      search: '',
    },
    id: 'zq9v3s',
    title: '',
    length: 3,
  },
}
export const state1 = defaultInitState(create('/', 'home'))
export const state = flow(
  ste => reducer(ste, create('/students', 'Students')),
  ste => reducer(ste, create('/students/abc1', 'Emily')),
  ste => reducer(ste, create('/students/def2', 'George'))
)(state1)
