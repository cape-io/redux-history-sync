import { connect } from 'react-redux'
import { createHistory, selectActiveKey } from 'react-router-redux'
import App from './components/App'

function mapStateToProps(state) {
  // console.log(state)
  return {
    value: selectActiveKey(state.history).location.pathname
  }
}
function handleChange(event) {
  return createHistory({ pathname: event.target.value })
}
const mapDispatchToProps = {
  onChange: handleChange
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
