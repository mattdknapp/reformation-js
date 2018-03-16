import React from 'react';

const CheckBox = (props) => {
  const {
    label,
    fieldId,
    groupClass
  } = props;

  const groupClasses = `form-check ${String(groupClass || '')}`.trim();

  return (
    <div className={groupClass}>
      <input className="form-check-input" type="checkbox" id="fieldId"/>
        <label className="form-check-label" htmlFor="test">
          {label}
        </label>
    </div>
  )
};

export default CheckBox;
