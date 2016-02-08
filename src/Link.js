import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { create } from './actions'

// Really simple Link component to help transition from react-router.

function mapStateToProps() {
  return {}
}

// @TODO Enable link to optionally call HISTORY_RESTORE action.
function mapDispatchToProps(dispatch, ownProps) {
  const { href, to, hash } = ownProps
  // This is called on click.
  function handleClick(event) {
    event.preventDefault()
    // Dispatch our event.
    return dispatch(create({
      pathname: href || to,
      hash,
    }))
  }
  return {
    onClick: handleClick,
  }
}

// Simply attaches the dispatch wrapped handleClick() above.
function Anchor({ onClick, ...props }) {
  return <a onClick={onClick} {...props} />
}
Anchor.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Anchor)
