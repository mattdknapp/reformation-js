import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ValidatedField from './ValidatedField'
import FieldLabel from './FieldLabel'
import { safeString, safeFunc } from '../lib/utilities'

const TextField = (props) => {
  const {
    fieldId,
    label,
    hideLabel,
    placeholder,
    fieldClass,
    onChange,
    value,
    invalidClass,
    handleFocus,
    handleBlur,
  } = props

  const fieldClasses = `form-control ${invalidClass} ${safeString(
    fieldClass,
  )}`.trim()
  const handleChange = safeFunc(onChange)

  return (
    <Fragment>
      <FieldLabel fieldId={fieldId} label={label} hideLabel={hideLabel} />
      <input
        type="text"
        className={fieldClasses}
        id={safeString(fieldId)}
        value={value}
        placeholder={safeString(placeholder)}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Fragment>
  )
}

const ValidatedTextField = (props) => {
  return (
    <ValidatedField {...props}>
      <TextField {...props} />
    </ValidatedField>
  )
}

TextField.propTypes = {
  fieldId: PropTypes.string,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  fieldClass: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  invalidClass: PropTypes.string,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
}

export default ValidatedTextField
