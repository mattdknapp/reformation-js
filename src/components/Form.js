import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.renderFields = this.renderFields.bind(this);
    this.getRootSchema = this.getRootSchema.bind(this);
    this.getpath = this.getpath.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getRootSchema() {
    const {
      isChildForm,
      getRootSchema,
      schema
    } = this.props;

    if(isChildForm) {
      return getRootSchema();
    }

    return schema;
  }

  getpath() {
    const {
      path
    } = this.props;

    return path || '#'
  }

  handleChange(data) {
    // data consists of an object of the form: { path, field, value, event }
    // path is the path to the field being altered.
    // field is the lowest level key of the path.
    // value is the new value given.
    // event is the original event triggering the change.
    const {
      onChange,
      isChildForm
    } = this.props;

    if(!onChange && !isChildForm) {
      console.warn('No "onChange" action provided for form');
      return;
    }

    return onChange(data);
  }

  renderFields() {
    const {
      schema,
      formState,
      formErrors,
      validator,
    } = this.props;

    const key = schema.type === 'array' ? 'items' : 'properties';

    const path = this.getpath()
    const entries = Object.entries(schema[key]);
    const handleChange = this.handleChange;
    return (
      entries.map(([key, value], i) => {
        return (
          <FormField
            key={i}
            schema={value}
            path={path}
            formState={formState}
            formErrors={formErrors}
            fieldKey={key}
            onChange={handleChange}
            getRootSchema={this.getRootSchema}
            validator={validator}
          />
        )
      })
    )
  }

  render() {
    const {
      header,
      schema,
      isChildForm
    } = this.props;

    if(isChildForm) {
      return (
        this.renderFields()
      );
    }

    return (
      <div className="card">
        <div className="card-body">
          <div className="card-header">
            {header}
          </div>
          <form className="test-form">
            <div className="row">
              {this.renderFields()}
            </div>
          </form>
        </div>
      </div>
    );
  }
};

Form.propTypes = {
  isChildForm: PropTypes.bool,
  formState: PropTypes.object,
  formErrors: PropTypes.object,
  schema: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  includeContainer: PropTypes.bool,
  header: PropTypes.string,
  path: PropTypes.string,
  validator: PropTypes.object,
};

export default Form;
