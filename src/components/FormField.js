import React from 'react';
import Reference from '../lib/Reference';
import translateReferences from '../lib/TranslateReferences';
import Ajv from 'ajv';
import Form from './Form';
import CheckBox from './CheckBox';
import StringInput from './StringInput';

const ajv = new Ajv();

const getFieldSize = (entry) => {
  if(!entry.formMeta) {
    return 'col-sm-12';
  }

  switch(entry.formMeta.size) {
    case 'full':
      return 'col-sm-12';
    case 'large':
      return 'col-sm-8';
    case 'medium':
      return 'col-sm-6';
    case 'small':
      return 'col-sm-4';
    case 'xSmall':
      return 'col-sm-2';
    default:
      return 'col-sm-12';
  }
};

const eventKeys = [
  'value',
  'path',
  'event',
  'field',
];

const keyCheck = (pre, next) => {
  return pre && eventKeys.includes(next);
};

const eventIsProcessed = (event) => {
  const keys = Object.keys(event);

  return keys.reduce(keyCheck, true);
};

const isValid = ({
  schema,
  value,
  error,
  getRootSchema,
}) => {
  if(error) {
    return error;
  }

  const shouldValidate = schema && schema.type !== 'object';

  if(shouldValidate) {
    const safeSchema = translateReferences({
      schema,
      originalSchema: getRootSchema()
    });
    return ajv.validate(safeSchema, value);
  }

  return true;
};

const processValue = (target) => {
  if(!target) {
    return null;
  }

  const {
    value,
    type,
  } = target;

  if(type === 'checkbox') {
    return !(value === 'on');
  }

  return value;
};

const FormField = (props) => {
  const {
    schema,
    fieldKey,
    getRootSchema,
    path,
    onChange,
    formState,
    formErrors,
  } = props;

  const {
    type,
    title,
    description,
  } = schema;

  const newPath = `${path}/${fieldKey}`;
  const dataRef = Reference({ path: newPath, schema: formState });
  const errorRef = Reference({ path: newPath, schema: formErrors });
  const value = dataRef.valueOrElse('');
  const error = errorRef.valueOrElse(null);
  const valid = isValid({
    schema,
    error,
    value,
    getRootSchema,
  });

  const handleChange = (eventData) => {
    if(eventIsProcessed(eventData)) {
      return onChange(eventData);
    }

    const value = processValue(eventData.target);

    onChange({
      path: newPath,
      field: fieldKey,
      event: eventData,
      value,
    });
  };

  switch(type) {
    case 'string':
      return (
        <StringInput
          schema={schema}
          fieldKey={fieldKey}
          path={newPath}
          error={error}
          value={value}
          handleChange={handleChange}
          groupClass={getFieldSize(schema)}
          getRootSchema={getRootSchema}
        />
      );
    case 'boolean':
      return (
        <CheckBox
          label={title}
          fieldId={fieldKey}
          path={newPath}
          error={error}
          value={value}
          handleChange={handleChange}
          groupClass={getFieldSize(schema)}
        />
      )
    case 'object':
      return ([
        <hr key={`hr-${fieldKey}`}/>,
        <Form
          key={`form-${fieldKey}`}
          schema={schema}
          path={newPath}
          formState={formState}
          formErrors={formErrors}
          value={value}
          isChildForm={true}
          onChange={handleChange}
          getRootSchema={getRootSchema}
        />
      ])
    default:
      return '';
  }
};

export default FormField;
