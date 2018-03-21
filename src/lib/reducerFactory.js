import mergeAndSet from './mergeAndSet';

const testReducer = (func) => {
  const testText = 'testing the reducer function';
  const testState = { testText };
  const returnedState = func(testState)
  const correctState = returnedState && returnedState.testText === testText;
  if(!correctState) {
    console.error('Invalid reduce function provided');
  }
};

const duckFactory = ({
  namespace,
  initialState,
}) => {
  const defaultState = {
    form: {},
    errors: {},
  };
  const saneInitialState = initialState || defaultState;

  const SET_FIELD = `${namespace}/SET_FIELD`;
  const LOAD_FORM = `${namespace}/LOAD_FORM`;
  const SET_ERROR = `${namespace}/SET_ERROR`;
  const LOAD_ERRORS = `${namespace}/LOAD_ERRORS`;
  const CLEAR = `${namespace}/CLEAR`;

  const reducer = (state=saneInitialState, action) => {
    const {
      type,
      payload
    } = action;

    switch(type) {
      case(SET_FIELD):
        const newData = mergeAndSet({
          state: state.data,
          field: payload.path,
          value: payload.value,
        });
        return {
          ...state,
          data: newData,
        };
      case(LOAD_FORM):
        return {
          ...state,
          data: payload
        };
      case(SET_ERROR):
        const newErrors = mergeAndSet({
          state: state.data,
          field: payload.path,
          value: payload.value,
        });
        return {
          ...state,
          errors: newErrors,
        };
      case(LOAD_ERRORS):
        return {
          ...state,
          errors: payload
        };
      case(CLEAR):
        return saneInitialState;
      default:
        return state;
    }
  };

  const setField = (payload) => {
    return { type: SET_FIELD, payload };
  };

  const setError = (payload) => {
    return { type: SET_ERROR, payload };
  };

  const loadForm = (payload) => {
    return { type: LOAD_FORM, payload };
  };

  const createReducer = (func) => {
    if(!func) {
      return reducer;
    }

    testReducer(func);
    return (state, action) => {
      return func(reducer(state, action), action)
    }
  };

  return {
    createReducer,
    actionTypes: {
      SET_FIELD,
    },
    actionCreators: {
      setField,
      loadForm,
    }
  };
};

export default duckFactory;
