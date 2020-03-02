import {
  SET_CAPTCHA,
  SET_CURRENT_USER,
  SET_FETCHING,
  SET_UPDATING,
  SetCaptchaAction,
  SetCurrentUserAction,
  SetFetchingAction,
  SetUpdatingAction
} from './types';

export const setCurrentUser = (userId: number | null = null,
                               email: string | null = null,
                               login: string | null = null): SetCurrentUserAction => ({
  type: SET_CURRENT_USER,
  data: {userId, email, login}
});

export const setCaptcha = (captcha: string | null = null): SetCaptchaAction => ({
  type: SET_CAPTCHA,
  data: {captcha}
});

export const setFetching = (fetching: boolean): SetFetchingAction => ({
  type: SET_FETCHING,
  data: {fetching}
});

export const setUpdating = (updating: boolean): SetUpdatingAction => ({
  type: SET_UPDATING,
  data: {updating}
});