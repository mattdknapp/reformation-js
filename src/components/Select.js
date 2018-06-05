import React from 'react';
import PropTypes from 'prop-types';
import FieldLabel from './FieldLabel';
import { getErrorMessage } from '../lib/utilities';

const Option = (props) => {
  const {
    value,
  } = props;

  const safeValue = value || '-- SELECT --';
  return (
    <option>{safeValue}</option>
  )
};

const Select = (props) => {
  const {
    enums,
    label,
    groupClass,
    onChange,
    error,
    value,
    hideLabel,
    fieldId,
    required,
  } = props;

  const groupClasses = `form-group ${String(groupClass || '')}`.trim();
  const errorMessage = getErrorMessage(error);

  return (
    <div className={groupClasses}>
      <FieldLabel
        fieldId={fieldId}
        label={label}
        hideLabel={hideLabel}
      />
      <select
        className="form-control form-control-sm"
        value={value}
        onChange={onChange}>
        {enums.map((value, i) => {
          return (
            <Option value={value} key={i}/>
          )
        })}
      </select>
      <div className="invalid-feedback">
        {errorMessage}
      </div>
    </div>
  )
};

Select.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  enums: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  groupClass: PropTypes.string
};

export default Select;
