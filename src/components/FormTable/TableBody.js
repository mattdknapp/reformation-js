import React from 'react';
import TextField from '../TextField';

class TableRow extends React.Component{
  shouldComponentUpdate(nextProps) {
    const {
      value
    } = this.props;

    const {
      value: nextValue
    } = nextProps;

    return (value !== nextValue);
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
            <td key={i}>
              <TextField
              />
            </td>
          );
        })}
      </tr>
    )
  }
};

const TableBody = (props) => {
  const {
    properties,
    value,
  } = props;


  const safeValue = value || [];

  return (
    <tbody>
      {safeValue.map((val, i) => {
        return(
          <TableRow value={val} key={i}/>
        );
      })}
    </tbody>
  );
};

export default TableBody;
