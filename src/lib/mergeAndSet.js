const mergeAndSet = ({state, field, value}) => {
  const fieldArray = Array.isArray(field) ? field : field.replace('#/', '').split('/');
  const currentKey = fieldArray[0];
  const fieldsRemaining = fieldArray.length;
  if(fieldsRemaining === 1){
    return Object.assign({}, state, {
      [currentKey]: value
    });
  }
  const newFieldArray = fieldArray.slice(1, fieldsRemaining);
  return Object.assign({}, state, {
    [currentKey]: mergeAndSet({state: state[currentKey], field: newFieldArray, value})
  });
};

export default mergeAndSet;
