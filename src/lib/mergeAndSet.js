const replaceAtIndex = ({
  array,
  index,
  value,
}) => {
  const trailingIndex = index + 1;
  const leading = array.slice(0, index);
  const trailing = array.slice(trailingIndex, array.length)

  return [].concat(
    leading,
    value,
    trailing
  );
};

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
  const numberKey = Number(currentKey);

  if(!isNaN(numberKey) && typeof numberKey === 'number') {
    const newValue = mergeAndSet({
      state: state[numberKey],
      field: newFieldArray,
      value
    });

    const newArray = replaceAtIndex({
      array: state,
      index: numberKey,
      value: newValue,
    });

    return newArray;
  }

  return Object.assign({}, state, {
    [currentKey]: mergeAndSet({
      state: state[Number(currentKey) || currentKey],
      field: newFieldArray,
      value
    })
  });
};

export default mergeAndSet;
