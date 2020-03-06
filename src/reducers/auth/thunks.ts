import {stopSubmit} from 'redux-form';

import {setCaptcha, setCurrentUser, setFetching, setUpdating} from './actionCreators';
import {authAPI, securityAPI} from '../../api/api';
import {CaptchaResultCode, ResultCode} from '../../utils/responseCodes';
import {handleError, handleServerError} from '../../utils/errorHandler';
import {LoginData} from '../../models/types';
import {parseMessages} from '../../utils/errorParser';
import {AuthAsyncThunkAction} from './types';

export const getCurrentUser = (): AuthAsyncThunkAction => async (dispatch) => {
  dispatch(setFetching(true));

  try {
    const {resultCode, data: {id, email, login}} = await authAPI.getCurrentUser();

    if (resultCode !== ResultCode.SUCCESS) return;
    else dispatch(setCurrentUser(id, email, login));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFetching(false));
  }
};

const getCaptcha = (): AuthAsyncThunkAction => async (dispatch) => {
  try {
    const {url} = await securityAPI.getCaptcha();

    dispatch(setCaptcha(url));
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const login = ({
                        email,
                        password,
                        rememberMe,
                        captcha
                      }: LoginData): AuthAsyncThunkAction => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const {resultCode, messages} = await authAPI.login(email, password, rememberMe, captcha);

    switch (resultCode) {
      case ResultCode.SUCCESS:
        await dispatch(getCurrentUser());
        dispatch(setCaptcha());
        break;
      case CaptchaResultCode.CAPTCHA_REQUIRED:
        await dispatch(getCaptcha());
      // eslint-disable-next-line no-fallthrough
      case ResultCode.ERROR:
        dispatch(stopSubmit('login', parseMessages(messages)));
        break;
    }
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setUpdating(false));
  }
};

export const logout = (): AuthAsyncThunkAction => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const {resultCode, messages} = await authAPI.logout();

    if (resultCode !== ResultCode.SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setCurrentUser());
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setUpdating(false));
  }
};