import React from 'react'
import PropTypes from 'prop-types'
import { getErrorMessage } from '../lib/utilities'
import CuratedLabel from './CuratedLabel'

const RadioButton = (props) => {
  const { value, error } = props

  const invalidClass = error ? 'is-invalid' : ''
  const inputClass = `form-check-input ${invalidClass}`.trim()

  return (
    <div className="form-check form-check-inline">
      <input className={inputClass} type="radio" />
      <label className="form-check-label">{value}</label>
    </div>
  )
}

const RadioButtons = (props) => {
  const { enums, label, error } = props

  const invalidClass = error ? 'is-invalid' : ''
  const errorMessage = getErrorMessage(error)
  const displayValidationClass = error ? 'd-block' : ''
  const feedbackClasses = `invalid-feedback ${displayValidationClass}`.trim()
  const groupClasses = `col-sm-12 ${invalidClass}`.trim()

  return (
    <div className={groupClasses}>
      <div className="row">
        <div className="col-sm-12">
          <label>
            <CuratedLabel content={label} />
          </label>
        </div>
        <div className="col-sm-12">
          {enums.map((value, i) => {
            return <RadioButton value={value} error={error} key={i} />
          })}
          <div className={feedbackClasses}>{errorMessage}</div>
        </div>
      </div>
    </div>
  )
}

RadioButtons.propTypes = {
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  enum: PropTypes.array,
}

export default RadioButtons
