import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getErrorMessage, safeFunc, safeString } from '../lib/utilities'

class ValidatedField extends Component {
  constructor (props) {
    super(props)

    this.state = {
      touched: false,
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.shouldDisplayValidation = this.shouldDisplayValidation.bind(this)
  }

  handleFocus (e) {
    this.setState({
      touched: false,
    })
  }

  handleBlur (e) {
    const { handleBlur: onBlur } = this.props

    this.setState({
      touched: true,
    })

    safeFunc(onBlur)(e)
  }

  shouldDisplayValidation () {
    const { value, fieldKey, required = [], error, wasValidated } = this.props

    const { touched } = this.state

    const isRequired = required.includes(fieldKey)
    const isEmpty = !value
    const isValidEmpty = !isRequired && isEmpty
    const isMissing = isRequired && isEmpty
    const hasError = !isValidEmpty && error
    const isInError = isMissing || hasError
    const touchedOrValidated = touched || wasValidated
    const shouldDisplay = isInError && touchedOrValidated

    return shouldDisplay
  }

  render () {
    const {
      groupClass,
      value,
      error,
      renderedSeperately,
    } = this.props

    const { children, ...childProps } = this.props

    const { handleFocus, handleBlur } = this

    const shouldDisplayValidation = this.shouldDisplayValidation()
    const invalidClass = shouldDisplayValidation ? 'is-invalid' : ''
    const groupClasses = renderedSeperately
      ? 'form-group'
      : `form-group ${safeString(groupClass)}`.trim()
    const errorMessage = getErrorMessage(error)
    const errorOrMissing = (value && errorMessage) || '*Required'

    return (
      <div className={groupClasses}>
        {React.cloneElement(children, {
          invalidClass,
          handleFocus,
          handleBlur,
          ...childProps,
        })}
        <div className="invalid-feedback">{errorOrMissing}</div>
      </div>
    )
  }
}

ValidatedField.propTypes = {
  fieldId: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  groupClass: PropTypes.string,
  handleBlur: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  schema: PropTypes.object.required,
  error: PropTypes.object,
  renderedSeperately: PropTypes.bool,
  required: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.element,
  ]),
  wasValidated: PropTypes.bool,
}

export default ValidatedField
