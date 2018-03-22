import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const FormTable = (props) => {
  const {
    schema,
    value,
    schema,
    path,
    formState,
    formErrors,
    onChange,
    getRootSchema,
  } = props;

  const {
    items: { properties }
  } = schema;

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
        />
      </table>
    </div>
  );
};

export default FormTable;
