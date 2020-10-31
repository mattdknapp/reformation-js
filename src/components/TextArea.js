import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ValidatedField from './ValidatedField'
import FieldLabel from './FieldLabel'
import { safeString, safeFunc } from '../lib/utilities'

const Label = (props) => {
  const { fieldId, label, hideLabel, explicitLabel } = props

  if (explicitLabel) {
    return explicitLabel
  }

  return <FieldLabel fieldId={fieldId} label={label} hideLabel={hideLabel} />
}

const labelPropTypes = {
  fieldId: PropTypes.string,
  label: PropTypes.string,
  explicitLabel: PropTypes.string,
  hideLabel: PropTypes.bool,
}

Label.propTypes = labelPropTypes

const TextArea = (props) => {
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
    explicitLabel,
  } = props

  const fieldClasses = `form-control ${invalidClass} ${safeString(
    fieldClass,
  )}`.trim()
  const handleChange = safeFunc(onChange)

  return (
    <Fragment>
      <Label
        fieldId={fieldId}
        label={label}
        hideLabel={hideLabel}
        explicitLabel={explicitLabel}
      />
      <textarea
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

const textAreaPropTypes = {
  ...labelPropTypes,
  placeholder: PropTypes.string,
  fieldClass: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  invalidClass: PropTypes.string,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
}

const ValidatedTextArea = (props) => {
  return (
    <ValidatedField {...props}>
      <TextArea {...props} />
    </ValidatedField>
  )
}

TextArea.propTypes = textAreaPropTypes

export default ValidatedTextArea
