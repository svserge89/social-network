import {stopSubmit} from 'redux-form';

import {authAPI, securityAPI} from '../api/api';
import {CAPTCHA_REQUIRED, SUCCESS} from '../utils/responseCodes';
import {parseMessages} from '../utils/errorParser';
import {handleError, handleServerError} from '../utils/errorHandler';

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
    const {resultCode, data: {id, email, login}, messages} = await authAPI.getCurrentUser();

    if (resultCode !== SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setCurrentUser(id, email, login));
  } catch (error) {
    handleError(dispatch, error);
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
    const {resultCode, messages} = await authAPI.login(email, password, rememberMe, captcha);

    switch (resultCode) {
      case SUCCESS:
        await dispatch(getCurrentUser());
        dispatch(setCaptcha());
        break;
      case CAPTCHA_REQUIRED:
        await dispatch(getCaptcha());
      // eslint-disable-next-line no-fallthrough
      default:
        dispatch(stopSubmit('login', parseMessages(messages)));
        break;
    }
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setUpdating(false));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const {resultCode, messages} = await authAPI.logout();

    if (resultCode !== SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setCurrentUser());
  } catch (error) {
    handleError(dispatch, error);
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