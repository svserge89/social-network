import {stopSubmit} from 'redux-form';

import {setCaptcha, setCurrentUser, setFetching, setUpdating} from './actionCreators';
import {authAPI, securityAPI} from '../../api/api';
import {CAPTCHA_REQUIRED, SUCCESS} from '../../utils/responseCodes';
import {handleError, handleServerError} from '../../utils/errorHandler';
import {LoginData} from '../../models/types';
import {parseMessages} from '../../utils/errorParser';

export const getCurrentUser = () => async (dispatch: any) => {
  dispatch(setFetching(true));

  try {
    const {resultCode, data: {id, email, login}} = await authAPI.getCurrentUser();

    if (resultCode !== SUCCESS) return;
    else dispatch(setCurrentUser(id, email, login));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFetching(false));
  }
};

const getCaptcha = () => async (dispatch: any) => {
  const {url} = await securityAPI.getCaptcha();

  dispatch(setCaptcha(url));
};

export const login = ({
                        email,
                        password,
                        rememberMe,
                        captcha
                      }: LoginData) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
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