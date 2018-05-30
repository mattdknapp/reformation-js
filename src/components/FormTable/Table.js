import React, { Component } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Reference from '../../lib/Reference';

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

class FormTable extends Component {
  constructor(props) {
    super(props);

    this.getSafeSchema = this.getSafeSchema.bind(this);
  }

  getSafeSchema() {
    const {
      path,
      getRootSchema,
      schema,
      schema: {
        items,
      },
    } = this.props;

    if(items['$ref']) {
      const safeSchema = Reference({
        path: items['$ref'],
        schema: getRootSchema(),
      });

      return {
        type: 'array',
        items: {
          ...safeSchema.value(),
          required: items.required,
        }
      };
    }

    return schema;
  }

  render() {
    const {
      value,
      path,
      formState,
      formErrors,
      onChange,
      getRootSchema,
      fieldKey,
      schema,
    } = this.props;

    const safeSchema = this.getSafeSchema();

    const {
      items: { properties }
    } = safeSchema;

    const addItem = (event) => {
      const newItem = createNewItem(safeSchema);
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
            { ...this.props }
            schema={safeSchema}
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
  }
};

export default FormTable;
