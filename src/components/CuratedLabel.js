import React from 'react'
import PropTypes from 'prop-types'

const CuratedLabel = (props) => {
  const { content } = props

  if (typeof content === 'string') {
    return content
  }

  return <content />
}

CuratedLabel.propTypes = {
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
}
export default CuratedLabel
