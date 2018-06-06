import React from 'react';

import FormField from './FormField';
import Reference from '../lib/Reference';
import translateReferences from '../lib/TranslateReferences';

const filteredItems = [
  'properties',
  'items',
];

const filterIntermediaries = (item) => {
  return !filteredItems.includes(item);
};

const addScaffolding = (pre, next, i) => {
  if(i === 0) {
    return next;
  }

  if(isNaN(next)) {
    return `${pre}/properties/${next}`;
  }

  return `${pre}/items`;
};

const createFullPath = (path) => {
  const splitPath = path.split('/');
  const pathLength = splitPath.length;
  const keyIndex = pathLength - 1;
  const key = splitPath[keyIndex];
  const fullPath = splitPath.reduce(addScaffolding, '');

  return {
    key,
    fullPath,
  };
};

const FormFieldFactory = ({
  schema,
  validator,
}) => {
  const safeSchema = translateReferences({
    schema,
    originalSchema: schema,
  });

  const FormFieldWithContext = (props) => {
    const {
      path,
      formState,
      formErrors,
      isRequired,
      handleChange,
      hideLabel,
      wasValidated,
    } = props;

    const {
      key,
      fullPath,
    } = createFullPath(path);

    const getRootSchema = () => safeSchema;

    const currentSchema = Reference({
      path: fullPath,
      schema: safeSchema,
    });

    const required = isRequired ? [key] : [];
    const trimmedPath = path.replace(/\/[a-zA-Z0-9]*$/, '');
    return (
      <FormField
        schema={currentSchema.value()}
        path={trimmedPath}
        formState={formState}
        formErrors={formErrors}
        fieldKey={key}
        onChange={handleChange}
        getRootSchema={getRootSchema}
        required={required}
        validator={validator}
        hideLabel={hideLabel}
        wasValidated={wasValidated}
        renderedSeperately={true}
      />
    );
  };

  return FormFieldWithContext;
};

export default FormFieldFactory;
