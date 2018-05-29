import React from 'react';
import FormField from './FormField';
import Reference from '../lib/Reference';

const filteredItems = [
  'properties',
];

const checkIfNumber = (item) => {
  const isNumber = !isNaN(Number(item));

  return isNumber;
};

const filterNumber = (item) => {
  return !checkIfNumber(item);
};

const filterIntermediaries = (item) => {
  const isNumber = checkIfNumber(item);

  if(isNumber) {
    return false;
  }

  return !filteredItems.includes(item);
};

const getCurrentSchemaPath = (path) => {
  const splitPath = path.split('/').filter(filterNumber);
  return splitPath.join('/');
};

const getRequiredPath = (currentSchemaPath) => {
  return currentSchemaPath.split('/').reverse().slice(2).reverse().join('/') + '/required';
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

    console.log(pathRoot);
    console.log(key);
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
      />
    );
  };

  return FormFieldWithContext;
};

export default FormFieldFactory;
