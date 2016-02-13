import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { create } from './actions'
import { locationSerialize } from './utils'

// Really simple Link component to help transition from react-router.

export function mapStateToProps(state, ownProps) {
  return {
    href: ownProps.href || ownProps.to || locationSerialize(ownProps),
  }
}

export function parseUrl(string) {
  if (!string) {
    return {}
  }
  const url = window.document.createElement('a')
  url.href = string
  return url
}

export function getLocation({ to, href, ...location }) {
  return {
    ...parseUrl(to || href),
    ...location,
  }
}

// @TODO Enable link to optionally call HISTORY_RESTORE action.
function mapDispatchToProps(dispatch, ownProps) {
  // This is called on click.
  function handleClick(event) {
    event.preventDefault()
    // Dispatch our event.
    return dispatch(create(getLocation(ownProps)))
  }
  return {
    onClick: handleClick,
  }
}

// Simply attaches the dispatch wrapped handleClick() above.
function Anchor({ active, className, onClick, href, ...props }) {
  return (
    <a
      className={classnames({ active }, className)}
      onClick={onClick}
      href={href}
      {...props}
    />
  )
}
Anchor.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Anchor)
