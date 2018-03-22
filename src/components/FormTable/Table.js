import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

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

  console.log(schema);
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
      >
        Add Row
      </button>
    </div>
  );
};

export default FormTable;
