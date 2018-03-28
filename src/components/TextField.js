import React from 'react';
import {
  safeString,
  safeFunc,
  getErrorMessage,
} from '../lib/utilities';

const FieldLabel = (props) => {
  const {
    fieldId,
    label,
    hideLabel,
  } = props;

  if(hideLabel) {
    return (
      <label htmlFor={safeString(fieldId)}/>
    );
  }

  return (
    <label htmlFor={safeString(fieldId)}>
      {safeString(label)}
    </label>
  );
};

const TextField = (props) => {
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
  } = props;

  const invalidClass = error ? 'is-invalid' : '';
  const errorMessage = getErrorMessage(error);
  const fieldClasses = `form-control ${invalidClass} ${safeString(fieldClass)}`.trim();
  const groupClasses = `form-group ${safeString(groupClass)}`.trim();
  const handleChange = safeFunc(onChange);
  const onBlur = safeFunc(handleBlur);

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
        {errorMessage}
      </div>
    </div>
  )
}

export default TextField;
