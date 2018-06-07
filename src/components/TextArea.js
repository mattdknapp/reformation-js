import React, { Component, Fragment } from 'react';

import ValidatedField from './ValidatedField';
import FieldLabel from './FieldLabel';
import {
  safeString,
  safeFunc,
} from '../lib/utilities';

const Label = (props) => {
  const { 
    fieldId,
    label,
    hideLabel,
    explicitLabel,
  } = props;

  if(explicitLabel) {
    return explicitLabel;
  }

  return (
    <FieldLabel
      fieldId={fieldId}
      label={label}
      hideLabel={hideLabel}
    />
  );
};

class TextArea extends Component {
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
      explicitLabel,
    } = this.props;

    const fieldClasses = `form-control ${invalidClass} ${safeString(fieldClass)}`.trim();
    const handleChange = safeFunc(onChange);

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
};

const ValidatedTextArea = (props) => {
  return (
    <ValidatedField {...props}>
      <TextArea {...props}/>
    </ValidatedField>
  );
};

export default ValidatedTextArea;
