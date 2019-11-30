import {stopSubmit} from 'redux-form';

import {authAPI, securityAPI} from '../api/api';
import {parseMessages} from '../utils/errorParser';

const PREFIX = 'social-network/auth/';

const SET_CURRENT_USER = PREFIX + 'SET-CURRENT-USER';
const SET_CAPTCHA = PREFIX + 'SET-CAPTCHA';
const SET_FETCHING = PREFIX + 'SET-FETCHING';
const SET_UPDATING = PREFIX + 'SET-UPDATING';

// Action creators
const setCurrentUser = (userId = null, email = null, login = null) => ({
  type: SET_CURRENT_USER,
  data: {userId, email, login}
});

const setCaptcha = (captcha = null) => ({type: SET_CAPTCHA, data: {captcha}});

const setFetching = (fetching) => ({type: SET_FETCHING, data: {fetching}});

const setUpdating = (updating) => ({type: SET_UPDATING, data: {updating}});

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

const getCaptcha = () => async (dispatch) => {
  const {url} = await securityAPI.getCaptcha();

  dispatch(setCaptcha(url));
};

export const login = ({email, password, rememberMe, captcha}) => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const {messages, resultCode} = await authAPI.login(email, password, rememberMe, captcha);

    switch (resultCode) {
      case 0:
        await dispatch(getCurrentUser());
        dispatch(setCaptcha());
        break;
      case 10:
        await dispatch(getCaptcha());
      // eslint-disable-next-line no-fallthrough
      default:
        dispatch(stopSubmit('login', parseMessages(messages)));
        break;
    }
  } finally {
    dispatch(setUpdating(false));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const {resultCode} = await authAPI.logout();

    if (resultCode) return;

    dispatch(setCurrentUser());
  } finally {
    dispatch(setUpdating(false));
  }
};

// Utils
const changeData = (state, data) => ({...state, ...data});

const initialState = {
  userId: null,
  email: null,
  login: null,
  fetching: false,
  updating: false,
  captcha: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHING:
    case SET_CURRENT_USER:
    case SET_CAPTCHA:
    case SET_UPDATING:
      return changeData(state, action.data);
    default:
      return state;
  }
};

export default authReducer;