import {
  setCaptcha,
  setCurrentUser,
  setFetching,
  setUpdating,
} from './action-creators';
import authAPI from '../../api/auth';
import securityAPI from '../../api/security';
import {CaptchaResultCode, ResultCode} from '../../utils/response-codes';
import {handleError, handleServerError} from '../../utils/error-handler';
import {LoginData} from '../../models/types';
import {parseMessages} from '../../utils/error-parser';
import {AuthAsyncThunkAction} from './types';

export const getCurrentUser = (): AuthAsyncThunkAction => async (dispatch) => {
  dispatch(setFetching(true));

  try {
    const {resultCode, data} = await authAPI.getCurrentUser();

    if (resultCode === ResultCode.SUCCESS) {
      dispatch(setCurrentUser(data!.id, data!.email, data!.login));
    }
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFetching(false));
  }
};

export const getCaptcha = (): AuthAsyncThunkAction => async (dispatch) => {
  try {
    const {url} = await securityAPI.getCaptcha();

    dispatch(setCaptcha(url));
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const login =
  ({email, password, rememberMe, captcha}: LoginData): AuthAsyncThunkAction =>
  async (dispatch) => {
    dispatch(setUpdating(true));

    try {
      const {resultCode, messages} = await authAPI.login(
        email,
        password,
        rememberMe,
        captcha
      );

      switch (resultCode) {
        case ResultCode.SUCCESS:
          await dispatch(getCurrentUser());
          dispatch(setCaptcha());
          break;
        case CaptchaResultCode.CAPTCHA_REQUIRED:
          await dispatch(getCaptcha());
        // eslint-disable-next-line no-fallthrough
        case ResultCode.ERROR:
          throw parseMessages(messages);
      }
    } catch (error) {
      if ((error as any).submissionError) {
        throw error;
      }

      handleError(dispatch, error);
    } finally {
      dispatch(setUpdating(false));
    }
  };

export const logout = (): AuthAsyncThunkAction => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const {resultCode, messages} = await authAPI.logout();

    if (resultCode !== ResultCode.SUCCESS) {
      handleServerError(dispatch, messages);
    } else {
      dispatch(setCurrentUser());
    }
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setUpdating(false));
  }
};
