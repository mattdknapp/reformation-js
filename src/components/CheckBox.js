import React from 'react'
import { getErrorMessage } from '../lib/utilities'

const CheckedInput = (props) => {
  const { value, onChange, error, fieldId } = props

  const invalidClass = error ? 'is-invalid' : ''
  const fieldClasses = `form-check-input ${invalidClass}`.trim()

  if (value) {
    return (
      <input
        className={fieldClasses}
        type="checkbox"
        id={fieldId}
        checked
        onChange={onChange}
      />
    )
  }

  return (
    <input
      className={fieldClasses}
      type="checkbox"
      id={fieldId}
      onChange={onChange}
    />
  )
}

const CheckBox = (props) => {
  const { label, fieldId, groupClass, error, value, handleChange } = props

  const errorMessage = getErrorMessage(error)
  const groupClasses = `form-check ${String(groupClass || '')}`.trim()

  return (
    <div className={groupClasses}>
      <CheckedInput
        fieldId={fieldId}
        onChange={handleChange}
        error={error}
        value={value}
      />
      <label className="form-check-label" htmlFor="test">
        {label}
      </label>
      <div className="invalid-feedback">{errorMessage}</div>
    </div>
  )
}

export default CheckBox
