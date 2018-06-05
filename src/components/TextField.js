import React, { Component } from 'react';
import FieldLabel from './FieldLabel';
import {
  safeString,
  safeFunc,
  getErrorMessage,
} from '../lib/utilities';

class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: false,
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.shouldDisplayValidation = this.shouldDisplayValidation.bind(this);
  }

  handleFocus(e) {
    this.setState({
      touched: false,
    });
  }

  handleBlur(e) {
    const {
      handleBlur: onBlur,
    } = this.props;

    this.setState({
      touched: true,
    });

    safeFunc(onBlur)(e);
  }

  shouldDisplayValidation() {
    const {
      value,
      fieldKey,
      required = [],
      error,
      wasValidated,
    } = this.props;

    const {
      touched,
    } = this.state;

    const isMissing = required.includes(fieldKey) && !value;
    const isInError = (isMissing || error);
    const touchedOrValidated = (touched || wasValidated)
    const shouldDisplay = isInError && touchedOrValidated;

    return shouldDisplay;
  }

  render() {
    const {
      label,
      fieldId,
      placeholder,
      fieldClass,
      groupClass,
      onChange,
      handleBlur,
      value,
      schema,
      error,
      hideLabel,
      renderedSeperately,
    } = this.props;

    const shouldDisplayValidation = this.shouldDisplayValidation();
    const invalidClass = shouldDisplayValidation  ? 'is-invalid' : '';
    const fieldClasses = `form-control ${invalidClass} ${safeString(fieldClass)}`.trim();
    const groupClasses = renderedSeperately ? 'form-group' : `form-group ${safeString(groupClass)}`.trim();
    const handleChange = safeFunc(onChange);
    const errorMessage = getErrorMessage(error);
    const errorOrMissing = errorMessage || '*Required';

    return (
      <div className={groupClasses}>
        <FieldLabel
          fieldId={fieldId}
          label={label}
          hideLabel={hideLabel}
        />
        <input
          type="text"
          className={fieldClasses}
          id={safeString(fieldId)}
          value={value}
          placeholder={safeString(placeholder)}
          onChange={handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}/>
        <div className="invalid-feedback">
          {errorOrMissing}
        </div>
      </div>
    )
  }
}

export default TextField;
