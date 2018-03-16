import React from 'react';
import PropTypes from 'prop-types';
import CuratedLabel from './CuratedLabel';

const RadioButton = (props) => {
  const {
    value
  } = props;

  return (
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio"/>
      <label className="form-check-label">{value}</label>
    </div>
  )
};

const RadioButtons = (props) => {
  const {
    enums,
    label
  } = props;

  return (
    <div className="col-sm-12">
      <div className="row">
        <div className="col-sm-12">
          <label>
            <CuratedLabel content={label}/>
          </label>
        </div>
        <div className="col-sm-12">
          {enums.map((value, i) => {
            return (
              <RadioButton value={value} key={i}/>
            )
          })}
        </div>
      </div>
    </div>
  )
};

RadioButtons.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  enum: PropTypes.array
};

export default RadioButtons;
