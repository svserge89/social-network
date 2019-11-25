import {getCurrentUser} from './auth';

const PREFIX = "social-network/init/";

const SET_INITIALIZED = PREFIX + "SET-INITIALIZED";

// Action creators
const setInitialized = (initialized) => ({type: SET_INITIALIZED, initialized});

// Thunks
export const initialization = () => async (dispatch) => {
  await dispatch(getCurrentUser());
  dispatch(setInitialized(true));
};

// Utils
const changeInitialized = (state, initialized) => ({...state, initialized});

const initialState = {initialized: false};

const initReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return changeInitialized(state, action.initialized);
    default:
      return state;
  }
};

export default initReducer;