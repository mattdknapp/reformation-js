// Path format examples:
// #/it/is/a/path
// #/path/with/9/array/content
const castKey = key => isNaN(Number(key))
  ? key
  : Number(key)

const cast = (obj, isArray) => isArray
  ? Object.values(obj)
  : obj

const mergeAndSet = ({ state = {}, path, value }) => {
  const pathArray = Array.isArray(path)
    ? path
    : path.replace('#/', '').split('/')
  const [key, ...remainingKeys] = pathArray
  const isLastKey = remainingKeys.length === 0
  const currentKey = castKey(key)
  const isArray =
    Array.isArray(state) || typeof currentKey === 'number'

  if (isLastKey) {
    return cast(
      {
        ...state,
        [currentKey]: value,
      },
      isArray,
    )
  }

  return cast(
    {
      ...state,
      [currentKey]: mergeAndSet({
        state: state[currentKey],
        path: remainingKeys,
        value,
      }),
    },
    isArray,
  )
}

export default mergeAndSet
