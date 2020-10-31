export const safeString = (string) => String(string || '')

export const safeFunc = (func) => (arg) => {
  if (func && typeof func === 'function') {
    return func(arg)
  }
}

export const getErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error
  }

  return error ? 'Invalid' : ''
}
