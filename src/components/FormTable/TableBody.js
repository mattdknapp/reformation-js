import React from 'react';
import TextField from '../TextField';
import FormField from '../FormField';

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
    } = this.props;

    const entries = Object.entries(value);

    return (
      <tr>
        {entries.map(([key, val], i) => {
          return (
            <td
              key={i}
              className="text-center align-middle"
            >
              <FormField
                { ...this.props }
                schema={schema.items.properties[key]}
                fieldKey={key}
                value={val}
                path={`${path}`}
                hideLabel={true}
                inspect={true}
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
