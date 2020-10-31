import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ValidatedField from './ValidatedField'
import FieldLabel from './FieldLabel'

const Option = (props) => {
  const { value } = props

  const safeTitle = value || '-- SELECT --'
  return <option value={value}>{safeTitle}</option>
}

Option.propTypes = {
  value: PropTypes.string,
}

const Select = (props) => {
  const {
    enums,
    label,
    onChange,
    value,
    hideLabel,
    fieldId,
    invalidClass,
    handleFocus,
    handleBlur,
  } = props

  const fieldClass = `form-control form-control-sm ${invalidClass}`

  return (
    <Fragment>
      <FieldLabel fieldId={fieldId} label={label} hideLabel={hideLabel} />
      <select
        className={fieldClass}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {enums.map((val, i) => {
          return <Option value={val} key={`${val}`} />
        })}
      </select>
    </Fragment>
  )
}

const ValidatedSelect = (props) => {
  return (
    <ValidatedField {...props}>
      <Select {...props} />
    </ValidatedField>
  )
}

Select.propTypes = {
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  enums: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  groupClass: PropTypes.string,
}

export default ValidatedSelect
