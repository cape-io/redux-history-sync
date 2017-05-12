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
  index: 1,
  id: 'cra6ls8zpg2glcp611yvi',
  location: {
    hash: '',
    hostname: 'localhost',
    origin: 'http://localhost:3000',
    pathname: '/',
    port: '3000',
    protocol: 'http:',
    search: '',
  },
  title: 'Site Title Here',
}
export const state1 = defaultInitState(create('/', 'home'))
export const state = flow(
  ste => reducer(ste, create('/students', 'Students')),
  ste => reducer(ste, create('/students/abc1', 'Emily')),
  ste => reducer(ste, create('/students/def2', 'George'))
)(state1)
