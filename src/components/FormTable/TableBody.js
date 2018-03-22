import React from 'react';
import TextField from '../TextField';

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
    } = this.props;

    const entries = Object.entries(value);

    return (
      <tr>
        {entries.map(([key, value], i) => {
          return (
            <td
              key={i}
              className="text-center align-middle"
            >
              <TextField
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
  } = props;

  const safeValue = value || [];

  return (
    <tbody>
      {safeValue.map((val, i) => {
        return(
          <TableRow
            value={val}
            key={i}
            index={i}
            removeItem={removeItem}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
