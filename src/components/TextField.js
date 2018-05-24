import React, { Component } from 'react';
import FieldLabel from './FieldLabel';
import {
  safeString,
  safeFunc,
  getErrorMessage,
} from '../lib/utilities';

class TextField extends Component {
  render() {
    const {
      label,
      fieldId,
      placeholder,
      fieldClass,
      groupClass,
      onChange,
      handleBlur,
      value,
      schema,
      error,
      hideLabel,
      required = [],
      fieldKey,
    } = this.props;

    const invalidClass = error ? 'is-invalid' : '';
    const errorMessage = getErrorMessage(error);
    const isMissing = required.includes(fieldKey) && !value;
    const fieldClasses = `form-control ${invalidClass} ${safeString(fieldClass)}`.trim();
    const groupClasses = `form-group ${safeString(groupClass)}`.trim();
    const handleChange = safeFunc(onChange);
    const onBlur = safeFunc(handleBlur);
    const errorOrMissing = isMissing ? '*Required' : errorMessage;

    console.log(isMissing, fieldKey);
    console.log(errorOrMissing);
    return (
      <div className={groupClasses}>
        <FieldLabel
          fieldId={fieldId}
          label={label}
          hideLabel={hideLabel}
        />
        <input
          type="text"
          className={fieldClasses}
          id={safeString(fieldId)}
          value={value}
          placeholder={safeString(placeholder)}
          onChange={handleChange}
          onBlur={onBlur}/>
        <div className="invalid-feedback">
          {errorOrMissing}
        </div>
      </div>
    )
  }
}

export default TextField;
