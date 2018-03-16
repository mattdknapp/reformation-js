# reformation-js
A simple libary for generating html forms from JSON Schema using React.

# Installation
To install reformation-js:
```
npm install reformation-js
```

# Props

| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schema` | Object | true | A JSON Schema object representing the form you wish to render |
| `onChange` | Function | false | A function triggered when a field's value is changed |
| `header` | String | false | Text to be displayed in the header above the form |
