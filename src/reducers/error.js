const PREFIX = 'social-network/error/';

const SET_ERROR = PREFIX + 'SET-ERROR';

// Action creators
export const setError = (code, description) => ({type: SET_ERROR, data: {code, description}});

// Utils
const changeData = (state, data) => ({...state, ...data});

const initialState = {code: 0, description: null};

const errorReducer = (state = initialState, action) => {
  if (action.type === SET_ERROR) return changeData(state, action.data);
  else return state;
};

export default errorReducer;