const replaceAtIndex = ({
  array = [],
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

const isNumber = (val) => !isNaN(val) && typeof val === 'number';

const isLastFieldIndexOfArray = (state, numberKey, isLastField) => {
  const isStateArray = Array.isArray(state);
  const isIndexOfArray = isStateArray && isNumber(numberKey);
  return isLastField && isIndexOfArray;
};

const mergeAndSet = ({state, field, value}) => {
  const fieldArray = Array.isArray(field) ? field : field.replace('#/', '').split('/');
  const currentKey = fieldArray[0];
  const numberKey = Number(currentKey);
  const fieldsRemaining = fieldArray.length;
  const isLastField = fieldsRemaining === 1;
  if(isLastFieldIndexOfArray(state, numberKey, isLastField)) {
    return replaceAtIndex({
      array: state,
      index: numberKey,
      value,
    });
  }
  if(isLastField){
    return Object.assign({}, state, {
      [currentKey]: value
    });
  }
  const newFieldArray = fieldArray.slice(1, fieldsRemaining);

  if(isNumber(numberKey)) {
    const newValue = mergeAndSet({
      state: state && state[numberKey],
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
