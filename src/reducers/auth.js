import {authAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const PREFIX = "social-network/auth/";

const SET_CURRENT_USER = PREFIX + 'SET-CURRENT-USER';
const SET_FETCHING = PREFIX + 'SET-FETCHING';

// Action creators
const setCurrentUser = (userId = null, email = null, login = null) => ({
  type: SET_CURRENT_USER,
  data: {userId, email, login}
});

const setFetching = (fetching) => ({type: SET_FETCHING, data: {fetching}});

// Thunks
export const getCurrentUser = () => async (dispatch) => {
  dispatch(setFetching(true));

  try {
    const {resultCode, data: {id, email, login}} = await authAPI.getCurrentUser();

    if (resultCode) return;

    dispatch(setCurrentUser(id, email, login));
  } finally {
    dispatch(setFetching(false));
  }
};

export const login = ({email, password, rememberMe}) => async (dispatch) => {
  const {messages, resultCode} = await authAPI.login(email, password, rememberMe);

  const message = messages.length > 0 ? messages[0] : 'Some error';

  switch (resultCode) {
    case 0:
      dispatch(getCurrentUser());
      break;
    default:
      dispatch(stopSubmit('login', {_error: message}));
      break;
  }
};

export const logout = () => async (dispatch) => {
  const {resultCode} = await authAPI.logout();

  if (resultCode) return;

  dispatch(setCurrentUser());
};

// Utils
const changeData = (state, data) => ({...state, ...data});

const initialState = {userId: null, email: null, login: null, fetching: false};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHING:
    case SET_CURRENT_USER:
      return changeData(state, action.data);
    default:
      return state;
  }
};

export default authReducer;