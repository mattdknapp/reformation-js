import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const newObjectReducer = (pre, next) => {
  return {
    ...pre,
    [next]: ''
  };
};

const createNewItem = (schema) => {
  const {
    items: {
      properties
    }
  } = schema;

  return Object.keys(properties).reduce(newObjectReducer, {});
};

const FormTable = (props) => {
  const {
    value,
    schema,
    path,
    formState,
    formErrors,
    onChange,
    getRootSchema,
    fieldKey,
  } = props;

  const {
    items: { properties }
  } = schema;

  const addItem = (event) => {
    const newItem = createNewItem(schema);
    const newValue = [
      ...value,
      newItem,
    ];

    onChange({
      path,
      event,
      field: fieldKey,
      value: newValue,
    });
  };

  const removeItem = (event, index) => {
    const filterItem = (entry, i) =>  i !== index;

    const newValue = value.filter(filterItem);

    onChange({
      path,
      event,
      field: fieldKey,
      value: newValue,
    });
  };

  return (
    <div className="col-sm-12">
      <table className="table table-bordered">
        <TableHeader
          properties={properties}
        />
        <TableBody
          schema={schema}
          properties={properties}
          value={value}
          removeItem={removeItem}
        />
      </table>
      <button
        type="button"
        className="btn btn-success float-right"
        onClick={addItem}
      >
        Add Row
      </button>
    </div>
  );
};

export default FormTable;
