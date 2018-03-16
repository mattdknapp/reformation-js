import React from 'react';
import PropTypes from 'prop-types';
import CuratedLabel from './CuratedLabel';

const Option = (props) => {
  const {
    value
  } = props;

  return (
    <option>{value}</option>
  )
};

const Select = (props) => {
  const {
    enums,
    label,
    groupClass,
    onChange
  } = props;

  const groupClasses = `form-group ${String(groupClass || '')}`.trim();

  return (
    <div className={groupClasses}>
      <label>
        <CuratedLabel content={label}/>
      </label>
      <select className="form-control form-control-sm" onChange={onChange}>
        {enums.map((value, i) => {
          return (
            <Option value={value} key={i}/>
          )
        })}
      </select>
    </div>
  )
};

Select.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  enums: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  groupClass: PropTypes.string
};

export default Select;
