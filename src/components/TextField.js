import React, { Component } from 'react';
import FieldLabel from './FieldLabel';
import ValidatedField from './ValidatedField';
import {
  safeString,
  safeFunc,
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
      renderedSeperately,
    } = this.props;

    const fieldClasses = `form-control ${invalidClass} ${safeString(fieldClass)}`.trim();
    const handleChange = safeFunc(onChange);

    return (
      <ValidatedField {...this.props}>
        <input
          type="text"
          className={fieldClasses}
          id={safeString(fieldId)}
          value={value}
          placeholder={safeString(placeholder)}
          onChange={handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </ValidatedField>
    )
  }
}

export default TextField;
