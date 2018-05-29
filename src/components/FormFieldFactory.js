import React from 'react';
import FormField from './FormField';
import Reference from '../lib/Reference';

const filteredItems = [
  'properties',
  'items',
];

const filterIntermediaries = (item) => {
  return !filteredItems.includes(item);
};

const extractKeyAndRoot = (path) => {
  const splitPath = path.split('/').filter(filterIntermediaries);
  const pathLength = splitPath.length;
  const keyIndex = pathLength - 1;
  const key = splitPath[keyIndex];
  const pathRoot = splitPath.slice(0, keyIndex);

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
    } = props;

    const {
      key,
      pathRoot,
    } = extractKeyAndRoot(path);

    const getRootSchema = () => schema;

    const currentSchema = Reference({ path, schema });
    const requiredPath = `${pathRoot}/required`;;
    const requiredReference = Reference({ path: requiredPath, schema });
    const required = requiredReference.valueOrElse([])

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
