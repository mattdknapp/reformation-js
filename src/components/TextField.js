import React, { Component, Fragment } from 'react';

import ValidatedField from './ValidatedField';
import FieldLabel from './FieldLabel';
import {
  safeString,
  safeFunc,
} from '../lib/utilities';

class TextField extends Component {
  render() {
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
    } = this.props;

    const fieldClasses = `form-control ${invalidClass} ${safeString(fieldClass)}`.trim();
    const handleChange = safeFunc(onChange);

    return (
      <Fragment>
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
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Fragment>
    )
  }
};

const ValidatedTextField = (props) => {
  return (
    <ValidatedField {...props}>
      <TextField {...props}/>
    </ValidatedField>
  );
};

export default ValidatedTextField;
