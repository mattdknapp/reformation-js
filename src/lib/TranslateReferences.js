import Reference from './Reference';

const translateReferences = ({
  schema,
  path,
  originalSchema
}) => {
  const startingPath = path || '#';
  return translate({
    schema,
    path: startingPath,
    originalSchema });
};

const convertRef = ({
  schema,
  path,
}) => {
  return Reference({ schema, path }).value();
};

const translateNextLevel = ({
  originalSchema,
  key,
  value,
  path,
}) => {
  const nextPath = `${path}/${key}`;
  const translatedVal = translate({
    schema: value,
    path: `${path}/${key}`,
    originalSchema,
  });
  return ({
    [key]: translatedVal
  })
};

const reduceEntries = ({
  originalSchema,
  path,
}) => {

  const getValue = (nextKey, nextVal) => {
    if(nextVal && nextVal.$ref) {
      const value = Reference({
        schema: originalSchema,
        path: nextVal.$ref,
      }).value()

      return {
        key: nextKey,
        value,
      }
    }

    return {
      key: nextKey,
      value: nextVal,
    };
  };

  return (
    pre,
    [ nextKey, nextVal ]
  ) => {

    const {
      key,
      value
    } = getValue(nextKey, nextVal);

    if(!Array.isArray(value) && typeof value === 'object') {
      const next = translateNextLevel({
        originalSchema,
        key,
        path,
        value,
      })

      return ({
        ...pre,
        ...next
      });
    }

    if(key === '$ref') {
      const sanatizedPath = path.split('/').reverse()[0];
      return ({
        ...pre,
        [sanatizedPath]: value,
      });
    }

    return ({
      ...pre,
      [key]: value,
    });
  };
};

const translate = ({
  schema,
  path,
  originalSchema,
}) => {
  const keys = Object.keys(schema);
  if(keys.includes('enum')) {
  }

  const entries = Object.entries(schema);
  const reducer = reduceEntries({
    originalSchema,
    path,
  });

  return entries.reduce(reducer, {});
};

export default translateReferences;
