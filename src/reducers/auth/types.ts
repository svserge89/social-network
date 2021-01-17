import {ThunkAction} from 'redux-thunk';

import {RootState} from '../../store/types';

export const SET_CURRENT_USER = 'social-network/auth/SET-CURRENT-USER';
export const SET_CAPTCHA = 'social-network/auth/SET-CAPTCHA';
export const SET_FETCHING = 'social-network/auth/SET-FETCHING';
export const SET_UPDATING = 'social-network/auth/SET-UPDATING';

export type SetCurrentUserAction = {
  type: typeof SET_CURRENT_USER;
  payload: {userId: number | null; email: string | null; login: string | null};
};

export type SetCaptchaAction = {
  type: typeof SET_CAPTCHA;
  payload: {captcha: string | null};
};

export type SetFetchingAction = {
  type: typeof SET_FETCHING;
  payload: {fetching: boolean};
};

export type SetUpdatingAction = {
  type: typeof SET_UPDATING;
  payload: {updating: boolean};
};

export type AuthAction =
  | SetCurrentUserAction
  | SetCaptchaAction
  | SetFetchingAction
  | SetUpdatingAction;

export type AuthAsyncThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AuthAction
>;

export type AuthState = {
  userId: number | null;
  email: string | null;
  login: string | null;
  fetching: boolean;
  updating: boolean;
  captcha: string | null;
};
