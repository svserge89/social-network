import {ThunkAction} from 'redux-thunk';
import {FormAction} from 'redux-form';

import {RootState} from '../../store/types';

const PREFIX = 'social-network/auth/';

export const SET_CURRENT_USER = PREFIX + 'SET-CURRENT-USER';
export const SET_CAPTCHA = PREFIX + 'SET-CAPTCHA';
export const SET_FETCHING = PREFIX + 'SET-FETCHING';
export const SET_UPDATING = PREFIX + 'SET-UPDATING';

export type SetCurrentUserAction = {
  type: typeof SET_CURRENT_USER
  data: { userId: number | null, email: string | null, login: string | null }
}

export type SetCaptchaAction = {
  type: typeof SET_CAPTCHA
  data: { captcha: string | null }
}

export type SetFetchingAction = {
  type: typeof SET_FETCHING
  data: { fetching: boolean }
}

export type SetUpdatingAction = {
  type: typeof SET_UPDATING
  data: { updating: boolean }
}

export type AuthAction = SetCurrentUserAction
  | SetCaptchaAction
  | SetFetchingAction
  | SetUpdatingAction;

export type AuthAsyncThunkAction =
  ThunkAction<Promise<void>, RootState, unknown, AuthAction | FormAction>;

export type AuthState = {
  userId: number | null
  email: string | null
  login: string | null
  fetching: boolean
  updating: boolean
  captcha: string | null
}