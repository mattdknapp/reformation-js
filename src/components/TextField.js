import React from 'react';

const safeString = (string) => String(string || '')

const safeFunc = (func) => (
  (arg) => {
    if(func && typeof func === 'function') {
      return func(arg);
    }
  }
)

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
  } = props;

  const fieldClasses = `form-control ${safeString(fieldClass)}`.trim();
  const groupClasses = `form-group ${safeString(groupClass)}`.trim();
  const handleChange = safeFunc(onChange);
  const onBlur = safeFunc(handleBlur);

  return (
    <div className={groupClasses}>
      <label htmlFor={safeString(fieldId)}>
        {safeString(label)}
      </label>
      <input
        type="text"
        className={fieldClasses}
        id={safeString(fieldId)}
        placeholder={safeString(placeholder)}
        onChange={handleChange}
        onBlur={onBlur}/>
    </div>
  )
}

export default TextField;
