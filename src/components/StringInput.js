import React from 'react';
import RadioButtons from './RadioButtons';
import Select from './Select';
import TextField from './TextField';
import Reference from '../lib/Reference';

const inputMap = {
  radioButtons: RadioButtons,
  textField: TextField,
  select: Select
};

// from -> to
const childPropsMap = {
  'title': 'label',
  'fieldKey': 'fieldKey',
  'groupClass': 'groupClass',
  'handleChange': 'onChange',
  'description': 'placeholder',
  'value': 'value',
  'schema': 'schema',
  'error': 'error'
};

const childPropsKeys = Object.keys(childPropsMap);
const filterFunc = (key) => childPropsKeys.includes(key);
const reduceFuncFactory = (props) => {
  return (pre, next) => {
    const nextKey = childPropsMap[next];
    const nextValue = props[next];
    return {
      ...pre,
      [nextKey]: nextValue
    };
  };
};

const getEnums = (schema, getRootSchema) => {
  if(!schema.enum) {
    return {};
  }

  switch(Array.isArray(schema.enum)) {
    case true:
      return { enums: schema.enum };
    case false:
      const path = schema.enum.$ref;
      const enums = Reference({ path: path, schema: getRootSchema() });
      return { enums: enums.value() };
  }
};

const getFieldProps = (props) => {
  const {
    schema,
    getRootSchema
  } = props;

  const enums = getEnums(schema, getRootSchema);
  const keys = Object.keys(props);
  const filteredKeys = keys.filter(filterFunc);
  const reduceFunc = reduceFuncFactory({ ...props, ...schema });
  return filteredKeys.reduce(reduceFunc, enums);
};

const StringInput = (props) => {
  const {
    schema,
    getRootSchema,
    value
  } = props;

  const {
    formMeta
  } = schema;

  const fieldProps = getFieldProps({
    ...props,
    ...schema
  });

  if(formMeta && formMeta.viewAs) {
    return inputMap[formMeta.viewAs](fieldProps);
  }

  if(schema.enum) {
    return (
      <Select
        { ...fieldProps }
      />
    )
  }

  return (
    <TextField
      { ...fieldProps }
    />
  )
};

export default StringInput;
