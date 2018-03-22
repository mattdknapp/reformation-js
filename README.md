# reformation-js
A simple libary for generating html forms from JSON Schema using React and
Bootstrap.

# Installation
To install reformation-js:
```
npm install reformation-js
```

# Form
The Form component is the primary interface for `reformation-js`.

| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schema` | Object | true | A JSON Schema object representing the form you wish to render |
| `formState` | Object | false | A Representation of the current state of the form |
| `formErrors` | Object | false | Form related errors |
| `onChange` | Function | false | A function triggered when a field's value is changed |
| `header` | String | false | Text to be displayed in the header above the form |

# reducerFactory
`reformation-js` includes a helper function exported as `reducerFactory` to
facilitate quick and easy creation of reducer functions to be used with
`reformation-js`. This helper function is in no way a dependency of
`reformation-js` but does provide a convenient way to quickly handle data
through the usage of gaearon's excelent `redux` library.

## Arguments
`reducerFactory` expects exactly two areguments when called:

| Arguments | Type | Description |
| :-- | :-- | :-- |
| `namespace` | String | The namespace used to scope action types. |
| `initialState` | Object | Initialization state for the form. |

## Output
When called `reducerFactory` will return an object with the following
structure:

| Attribute | Type | Description |
| :-- | :-- | :-- |
| `createReducer` | Function | A factory function that will return a new reducer function when called. |
| `actionTypes` | Object | A collection of namespaced action types used by the outputted reducer of `createReducer`. |
| `actionCreators` | Object | A collection of actionCreators for use of the outputted reducer of `createReducer`. |

# JSON Schema interpretation

## JSON Schema Keywords
Several JSON Schema keywords are used to determine how the form should be
renderd.

### Keyword: type
Determines what type of field will be rendered. Can be overwritten.

### Keyword: title
Will be rendered as the form field's label if present.

### Keyword: description
Will be used as a placeholder on a text input if present.

## Custom Meta Attributes
`reformation-js` provides the ability for extra meta date about the form to be
embeded in an object in the provided schema by using the attribute `formMeta`.
The following keywords are recognized.

### size
Sets the sixe of the input field created.

| Values |
| :-- |
| `xSmall` |
| `small` |
| `medium` |
| `large` |
| `full` |

### viewAs
Allows control of the field type by overriding the default.

| Values |
| :-- |
| `radioButtons` |
| `textField` |
| `select` |

# Examples

## Rendering a form from a JSON Schema

```javascript
import React from 'react';
import Form from 'reformation-js';
import someValidSchema from './honestlyValidJsonSchema.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        fieldOne: 'default',
        fieldTwo: 'anotherDefault',
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    const {
      formData
    } = this.state;

    const {
      field,
      value,
      event,
    } = data;

    const newFormData = {
      ...formData,
      [field]: value,
    };

    this.setState({
      formData: newFormData
    });
  }

  render() {
    const {
      formData
    } = this.state;

    return (
      <Form
        schema={someValidSchema}
        formState={formData}
      />
    )
  }
};
```

## Creating a reducer and action creators using reducerFactory

```javascript
import { reducerFactory } from 'reformation-js';

const initialState = {
  data: { state: 'NC' },
  errors: {}
};

const namespace = 'simpleForm';

const duckObject = reducerFactory({ namespace, initialState });

const reducer = duckObject.createReducer();

export { actionCreators };
export default reducer;
```

## Passing custom errors to a form

Our schema for this example:
```json
{
  "title": "Simple Address",
  "type": "object",
  "properties": {
    "street": {
      "type": "string",
      "title": "Physical Address",
      "description": "123 Main Street",
      "formMeta": {
        "size": "small"
      }
    },
    "city": {
      "type": "string",
      "title": "City",
      "description": "Metropolis",
      "formMeta": {
        "size": "small"
      }
    },
    "state": {
      "type": "string",
      "title": "State",
      "enum": { "$ref": "#/definitions/states" },
      "formMeta": {
        "size": "xSmall"
      }
    },
    "zipcode": {
      "type": "string",
      "title": "Zip",
      "description": "12345-6789",
      "formMeta": {
        "size": "xSmall"
      }
    }
  },
  "required": ["street", "city", "state", "zipcode"],
  "definitions": {
    "states": [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District Of Columbia",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virgin Islands",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ]
  }
}
```
And our example code:
```
import React from 'react';
import Form from 'reformation-js';
import addressSchema from './addressSchema.json';

const startingFormData = {
  street: '225 N Trade St'
  city: 'Matthews',
  state: 'North Carolina',
  zipcode: '28105'
};

const formErrors = {
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        fieldOne: 'default',
        fieldTwo: 'anotherDefault',
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    const {
      formData
    } = this.state;

    const {
      field,
      value,
      event,
    } = data;

    const newFormData = {
      ...formData,
      [field]: value,
    };

    this.setState({
      formData: newFormData
    });
  }

  render() {
    const {
      formData
    } = this.state;

    return (
      <Form
        schema={addressSchema}
        formState={formData}
      />
    )
  }
};


```
