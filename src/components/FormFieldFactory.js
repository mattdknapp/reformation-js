import React, { Fragment } from 'react';
import FormField from './FormField';
import Reference from '../lib/Reference';

const extractKeyAndRoot = (path) => {
  const splitPath = path.split('/');
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
  const CurriedFormField = (props) => {
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

    const currentSchema = Reference({ path, schema: formState });

    return (
      <Fragment>
        <FormField
          schema={schema.properties.city}
          path={pathRoot}
          formState={formState}
          formErrors={formErrors}
          fieldKey={key}
          onChange={handleChange}
          getRootSchema={getRootSchema}
        />
      </Fragment>
    );
  };

  return CurriedFormField;
};

export default FormFieldFactory;
