import React from 'react';
import TextField from '../TextField';
import FormField from '../FormField';

const getKeysFromSchema = (schema) => {
  const items = schema.items;
  const properties = items ? items.properties : {};

  return Object.keys(properties);
};

class TableRow extends React.Component{
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // Index comparison is important for managing row deletion.
    const {
      value,
      index,
    } = this.props;

    const {
      value: nextValue,
      index: nextIndex,
    } = nextProps;

    return (value !== nextValue || index !== nextIndex);
  }

  remove(event) {
    const {
      removeItem,
      index,
    } = this.props;

    removeItem(event, index);
  }

  render() {
    const {
      value,
      fieldKey,
      path,
      schema,
      schema: {
        items
      },
    } = this.props;

    const keys = getKeysFromSchema(schema);

    return (
      <tr>
        {keys.map((key, i) => {
          const val = value[key];
          return (
            <td
              key={i}
              className="text-center align-middle"
            >
              <FormField
                { ...this.props }
                schema={items.properties[key]}
                fieldKey={key}
                value={val}
                path={`${path}`}
                hideLabel={true}
                required={items.required}
              />
            </td>
          );
        })}
        <td className="text-center align-middle">
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.remove}
          >
            Delete Row
          </button>
        </td>
      </tr>
    )
  }
};

const TableBody = (props) => {
  const {
    properties,
    value,
    removeItem,
    path,
  } = props;

  const safeValue = value || [];

  return (
    <tbody>
      {safeValue.map((val, i) => {
        return(
          <TableRow
            { ...props }
            value={val}
            key={i}
            index={i}
            removeItem={removeItem}
            path={`${path}/${i}`}
            fieldPath={path}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
