import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../lib/Reference';
import translateReferences from '../lib/TranslateReferences';
import Ajv from 'ajv';
import Form from './Form';
import CheckBox from './CheckBox';
import StringInput from './StringInput';
import FormTable from './FormTable/Table';

const rawAjv = new Ajv();

const getFieldSize = (entry) => {
  if(!entry.formMeta) {
    return 'col-sm-12';
  }

  switch(entry.formMeta.size) {
    case 'full':
      return 'col-sm-12';
    case 'large':
      return 'col-sm-8';
    case 'medium':
      return 'col-sm-6';
    case 'small':
      return 'col-sm-4';
    case 'xSmall':
      return 'col-sm-2';
    default:
      return 'col-sm-12';
  }
};

const eventKeys = [
  'value',
  'path',
  'event',
  'field',
];

const keyCheck = (pre, next) => {
  return pre && eventKeys.includes(next);
};

const eventIsProcessed = (event) => {
  const keys = Object.keys(event);

  return keys.reduce(keyCheck, true);
};

const isValid = ({
  schema,
  value,
  error,
  getRootSchema,
  validator,
}) => {
  if(error) {
    return error;
  }

  const ajv = validator || rawAjv;

  const shouldValidate = schema && schema.type !== 'object';

  if(shouldValidate) {
    const safeSchema = translateReferences({
      schema,
      originalSchema: getRootSchema()
    });
    return ajv.validate(safeSchema, value);
  }

  return true;
};

const processValue = (target) => {
  if(!target) {
    return null;
  }

  const {
    value,
    type,
  } = target;

  if(type === 'checkbox') {
    return !(value === 'on');
  }

  return value;
};

class FormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      innerSchema: null,
    };

    this.getRefs = this.getRefs.bind(this);
    this.newPath = this.newPath.bind(this);
    this.getInnerSchema = this.getInnerSchema.bind(this);
  }

  componentDidMount() {
    this.setState({
      innerSchema: this.getInnerSchema(),
    });
  }

  shouldComponentUpdate(nextProps) {
    const {
      dataRef,
      errorRef,
    } = this.getRefs();

    const {
      dataRef: nextDataRef,
      errorRef: nextErrorRef,
    } = this.getRefs(nextProps);

    const dataHasChanged = dataRef.valueOrElse('') !== nextDataRef.valueOrElse('');
    const errorHasChanged = errorRef.valueOrElse('') !== nextErrorRef.valueOrElse('');

    return (dataHasChanged || errorHasChanged);
  }

  newPath() {
    const {
      path,
      fieldKey,
    } = this.props;

    return `${path}/${fieldKey}`;
  }

  getRefs(nextProps) {
    const {
      formState,
      formErrors,
    } = nextProps || this.props;

    const newPath = this.newPath();
    const dataRef = Reference({ path: newPath, schema: formState });
    const errorRef = Reference({ path: newPath, schema: formErrors });

    return {
      dataRef,
      errorRef,
    };
  }

  getInnerSchema() {
    const {
      schema,
      getRootSchema,
    } = this.props;

    const {
      innerSchema,
    } = this.state;

    if(innerSchema) {
      return innerSchema;
    }

    if(schema.$ref) {
      const ref = Reference({ path: schema.$ref, schema: getRootSchema() });
      return ref.value();
    }

    return schema;
  }

  render() {
    const {
      schema,
      fieldKey,
      getRootSchema,
      onChange,
      formState,
      formErrors,
      hideLabel,
      validator,
      wasValidated,
      required,
    } = this.props;

    const innerSchema = this.getInnerSchema();

    const {
      type,
      title,
      description,
    } = innerSchema;

    const {
      dataRef,
      errorRef,
    } = this.getRefs();

    const newPath = this.newPath();
    const value = dataRef.valueOrElse('');
    const error = errorRef.valueOrElse(null);
    const valid = isValid({
      schema: innerSchema,
      error,
      value,
      getRootSchema,
      validator,
    });

    const handleChange = (eventData) => {
      if(eventIsProcessed(eventData)) {
        return onChange(eventData);
      }

      const value = processValue(eventData.target);

      onChange({
        path: newPath,
        field: fieldKey,
        event: eventData,
        value,
      });
    };

    const ajv = validator || rawAjv;

    switch(type) {
      case 'string':
        return (
          <StringInput
            schema={innerSchema}
            fieldKey={fieldKey}
            path={newPath}
            error={error || !valid}
            value={value}
            handleChange={handleChange}
            groupClass={getFieldSize(schema)}
            getRootSchema={getRootSchema}
            hideLabel={hideLabel}
            required={required}
            wasValidated={wasValidated}
          />
        );
      case 'boolean':
        return (
          <CheckBox
            label={title}
            fieldId={fieldKey}
            path={newPath}
            error={error}
            value={value}
            handleChange={handleChange}
            groupClass={getFieldSize(schema)}
            hideLabel={hideLabel}
            required={required}
            wasValidated={wasValidated}
          />
        );
      case 'object':
        return ([
          <hr key={`hr-${fieldKey}`}/>,
          <Form
            key={`form-${fieldKey}`}
            schema={innerSchema}
            path={newPath}
            formState={formState}
            formErrors={formErrors}
            value={value}
            isChildForm={true}
            onChange={handleChange}
            getRootSchema={getRootSchema}
            validator={ajv}
            wasValidated={wasValidated}
          />
        ]);
      case 'array':
        return (
          <FormTable
            key={`form-${fieldKey}`}
            schema={innerSchema}
            fieldKey={fieldKey}
            path={newPath}
            formState={formState}
            formErrors={formErrors}
            value={value}
            isChildForm={true}
            onChange={onChange}
            getRootSchema={getRootSchema}
            wasValidated={wasValidated}
          />
        );
      default:
        return '';
    }
  }
};

FormField.propTypes = {
  schema: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  path: PropTypes.string,
  formState: PropTypes.object,
  formErrors: PropTypes.object,
  fieldKey: PropTypes.string,
  onChange: PropTypes.func,
  getRootSchema: PropTypes.func,
  hideLabel: PropTypes.bool,
  validator: PropTypes.object,
  wasValidated: PropTypes.bool,
  required: PropTypes.array,
};

export default FormField;
