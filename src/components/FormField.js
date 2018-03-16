import React from 'react';
import Form from './Form';
import CheckBox from './CheckBox';
import StringInput from './StringInput';

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
];

const keyCheck = (pre, next) => {
  return pre && eventKeys.includes(next);
};

const eventIsProcessed = (event) => {
  const keys = Object.keys(event);

  return keys.reduce(keyCheck, true);
};

const FormField = (props) => {
  const {
    schema,
    fieldKey,
    getRootSchema,
    path,
    onChange
  } = props;

  const {
    type,
    title,
    description
  } = schema;

  const newPath = `${path}/${fieldKey}`;
  const handleChange = (eventData) => {
    if(eventIsProcessed(eventData)) {
      return onChange(eventData);
    }

    const { value } = eventData.target;

    onChange({
      path: newPath,
      event: eventData,
      value
    });
  };

  switch(type) {
    case 'string':
      return (
        <StringInput
          schema={schema}
          fieldKey={fieldKey}
          path={newPath}
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
          header="Another Test!"
          path={newPath}
          onChange={handleChange}
          getRootSchema={getRootSchema}
        />
      ])
    default:
      return '';
  }
};

export default FormField;
