import React from 'react';

import FormField from './FormField';
import Reference from '../lib/Reference';

const filteredItems = [
  'properties',
  'items',
];

const checkIfNumber = (item) => {
  const isNumber = !isNaN(Number(item));

  return isNumber;
};

const filterNumber = (item) => {
  return !checkIfNumber(item);
};

const filterIntermediaries = (item) => {
  return !filteredItems.includes(item);
};

const getCurrentSchemaPath = (path) => {
  const splitPath = path.split('/').filter(filterNumber);
  return splitPath.join('/');
};

const extractKeyAndRoot = (path) => {
  const splitPath = path.split('/').filter(filterIntermediaries);
  const pathLength = splitPath.length;
  const keyIndex = pathLength - 1;
  const key = splitPath[keyIndex];
  const pathRoot = splitPath.slice(0, keyIndex).join('/');

  return {
    key,
    pathRoot,
  }
};

const FormFieldFactory = ({
  schema,
  handleChange,
  validator,
}) => {
  const FormFieldWithContext = (props) => {
    const {
      path,
      formState,
      formErrors,
      isRequired,
    } = props;

    const {
      key,
      pathRoot,
    } = extractKeyAndRoot(path);

    const getRootSchema = () => schema;

    const currentSchemaPath = getCurrentSchemaPath(path);
    const currentSchema = Reference({
      path: currentSchemaPath,
      schema,
    });

    const required = isRequired ? [key] : [];
    return (
      <FormField
        schema={currentSchema.value()}
        path={pathRoot}
        formState={formState}
        formErrors={formErrors}
        fieldKey={key}
        onChange={handleChange}
        getRootSchema={getRootSchema}
        required={required}
        validator={validator}
      />
    );
  };

  return FormFieldWithContext;
};

export default FormFieldFactory;
