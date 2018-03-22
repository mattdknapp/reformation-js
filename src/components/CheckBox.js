import React from 'react';
import { getErrorMessage } from '../lib/utilities';

const CheckBox = (props) => {
  const {
    label,
    fieldId,
    groupClass,
    error,
  } = props;

  const invalidClass = error ? 'is-invalid' : '';
  const errorMessage = getErrorMessage(error);
  const fieldClasses = `form-check-input ${invalidClass}`.trim();
  const groupClasses = `form-check ${String(groupClass || '')}`.trim();

  return (
    <div className={groupClasses}>
      <input className={fieldClasses} type="checkbox" id="fieldId"/>
      <label className="form-check-label" htmlFor="test">
        {label}
      </label>
      <div className="invalid-feedback">
        {errorMessage}
      </div>
    </div>
  )
};

export default CheckBox;
