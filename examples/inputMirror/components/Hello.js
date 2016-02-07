import React, { PropTypes } from 'react'

function Hello({ greeting, url, success }) {
  return (
    <div>
      <h1>
        { url === '/' ? greeting : success }
      </h1>
      <h2>{`${url}`}</h2>
    </div>
  )
}
Hello.propTypes = {
  greeting: PropTypes.string.isRequired,
  success: PropTypes.string,
  url: PropTypes.string
}
Hello.defaultProps = {
  greeting: 'Type something in that input field!',
  success: 'Good job!'
}
export default Hello
