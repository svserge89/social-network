import {FORM_ERROR} from 'final-form';

import {AuthAction, AuthState, SET_CAPTCHA, SET_CURRENT_USER, SET_FETCHING, SET_UPDATING} from '../types';
import {Relation, UsersState} from '../../users/types';
import {RootState} from '../../../store/types';
import {CaptchaResultCode, ResultCode} from '../../../utils/response-codes';
import {GetCaptchaResponse, GetCurrentUserResponse, LoginResponse, LogoutResponse} from '../../../api/types';
import {AxiosError} from 'axios';
import {LoginData} from '../../../models/types';
import {TEST_ERROR_MESSAGE} from '../../error/__testing__/test-data';

export const TEST_INITIAL_STATE: AuthState = {
  userId: null,
  email: null,
  login: null,
  fetching: false,
  updating: false,
  captcha: null
};
export const TEST_ROOT_STATE: Partial<RootState> = {
  auth: {...TEST_INITIAL_STATE},
  users: {relation: Relation.ALL} as UsersState
};
export const TEST_ROOT_STATE_WITH_RELATION_FRIENDS: Partial<RootState> = {
  ...TEST_ROOT_STATE,
  users: {...TEST_ROOT_STATE.users, relation: Relation.FRIENDS} as UsersState
};

export const TEST_USER_ID = 42;
export const TEST_LOGIN = 'test_login';
export const TEST_EMAIL = 'test@email.com';
export const TEST_CAPTCHA = 'test_captcha';
export const TEST_CAPTCHA_URL = 'test/captcha/url';
export const TEST_PASSWORD = 'test_password';

export const TEST_ERROR_RESPONSE = {response: {status: 500, data: {message: TEST_ERROR_MESSAGE}}} as AxiosError;

export const TEST_SUCCESS_GET_CURRENT_USER_RESPONSE: GetCurrentUserResponse = {
  data: {id: TEST_USER_ID, email: TEST_EMAIL, login: TEST_LOGIN},
  resultCode: ResultCode.SUCCESS,
  messages: []
};
export const TEST_ERROR_GET_CURRENT_USER_RESPONSE: GetCurrentUserResponse = {
  resultCode: ResultCode.ERROR,
  messages: [TEST_ERROR_MESSAGE]
};

export const TEST_SUCCESS_GET_CAPTCHA_RESPONSE: GetCaptchaResponse = {url: TEST_CAPTCHA_URL};
export const TEST_SUCCESS_LOGIN_RESPONSE: LoginResponse = {
  data: {userId: TEST_USER_ID},
  resultCode: ResultCode.SUCCESS,
  messages: []
};
export const TEST_CAPTCHA_REQUIRED_LOGIN_RESPONSE: LoginResponse = {
  resultCode: CaptchaResultCode.CAPTCHA_REQUIRED,
  messages: [TEST_ERROR_MESSAGE]
};

export const TEST_ERROR_LOGIN_RESPONSE: LoginResponse = {resultCode: ResultCode.ERROR, messages: [TEST_ERROR_MESSAGE]};
export const TEST_SUCCESS_LOGOUT_RESPONSE: LogoutResponse = {data: {}, resultCode: ResultCode.SUCCESS, messages: []};
export const TEST_ERROR_LOGOUT_RESPONSE: LogoutResponse = {
  data: {},
  resultCode: ResultCode.ERROR,
  messages: [TEST_ERROR_MESSAGE]
};

export const TEST_SET_FETCHING_TRUE_ACTION: AuthAction = {type: SET_FETCHING, payload: {fetching: true}};
export const TEST_SET_FETCHING_FALSE_ACTION: AuthAction = {type: SET_FETCHING, payload: {fetching: false}};
export const TEST_SET_UPDATING_TRUE_ACTION: AuthAction = {type: SET_UPDATING, payload: {updating: true}};
export const TEST_SET_UPDATING_FALSE_ACTION: AuthAction = {type: SET_UPDATING, payload: {updating: false}};
export const TEST_SET_CURRENT_USER_ACTION: AuthAction = {
  type: SET_CURRENT_USER,
  payload: {userId: TEST_USER_ID, email: TEST_EMAIL, login: TEST_LOGIN}
};
export const TEST_SET_CURRENT_USER_EMPTY_ACTION: AuthAction = {
  type: SET_CURRENT_USER,
  payload: {email: null, userId: null, login: null}
};
export const TEST_SET_CAPTCHA_ACTION: AuthAction = {type: SET_CAPTCHA, payload: {captcha: TEST_CAPTCHA_URL}};
export const TEST_SET_CAPTCHA_EMPTY_ACTION: AuthAction = {type: SET_CAPTCHA, payload: {captcha: null}};

export const TEST_LOGIN_PARAM: LoginData = {
  email: TEST_EMAIL,
  password: TEST_PASSWORD,
  rememberMe: true,
  captcha: TEST_CAPTCHA
};

export const TEST_FORM_ERROR_EXCEPTION = {[FORM_ERROR]: TEST_ERROR_MESSAGE, submissionError: true};
