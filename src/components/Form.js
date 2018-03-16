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
      isTopLevel,
      getRootSchema,
      schema
    } = this.props;

    if(isTopLevel) {
      return schema;
    }

    return getRootSchema();
  }

  getpath() {
    const {
      path
    } = this.props;

    return path || '#'
  }

  handleChange(data) {
    // data consists of an object of the form: { path, value, event }
    // path is the path to the field being altered.
    // value is the new value given.
    // event is the original event triggering the change.
    const {
      onChange,
      isTopLevel
    } = this.props;

    if(!onChange && isTopLevel) {
      console.warn('No "onChange" action provided for form');
      return;
    }

    onChange(data);
  }

  renderFields() {
    const {
      schema
    } = this.props;

    const {
      properties
    } = schema;

    const path = this.getpath()
    const entries = Object.keys(properties);
    const handleChange = this.handleChange;
    return (
      entries.map((entry, i) => {
        return (
          <FormField
            key={i}
            schema={properties[entry]}
            path={path}
            fieldKey={entry}
            onChange={handleChange}
            getRootSchema={this.getRootSchema}
          />
        )
      })
    )
  }

  render() {
    const {
      header,
      schema,
      isTopLevel
    } = this.props;

    if(isTopLevel) {
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

    return (
      this.renderFields()
    );
  }
};

Form.propTypes = {
  isTopLevel: PropTypes.bool,
  schema: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  includeContainer: PropTypes.bool,
  header: PropTypes.string
};

export default Form;
