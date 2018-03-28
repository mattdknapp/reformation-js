import React from 'react';
import CuratedLabel from './CuratedLabel';
import { safeString } from '../lib/utilities';

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
      <CuratedLabel content={safeString(label)}/>
    </label>
  );
};

export default FieldLabel;
