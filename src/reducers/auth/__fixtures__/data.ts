import {AuthAction, AuthState, SET_CAPTCHA, SET_CURRENT_USER, SET_FETCHING, SET_UPDATING} from '../types';
import {Relation, UsersState} from '../../users/types';
import {RootState} from '../../../store/types';
import {CaptchaResultCode, ResultCode} from '../../../utils/response-codes';
import {GetCaptchaResponse, GetCurrentUserResponse, LoginResponse, LogoutResponse} from '../../../api/types';
import {LoginData} from '../../../models/types';
import {ERROR_MESSAGE} from '../../error/__fixtures__/data';

export const USER_ID = 42;
export const LOGIN = 'test_login';
export const EMAIL = 'test@email.com';
export const CAPTCHA = 'test_captcha';
export const CAPTCHA_URL = 'test/captcha/url';
export const PASSWORD = 'test_password';

export const INITIAL_STATE: AuthState = {
  userId: null,
  email: null,
  login: null,
  fetching: false,
  updating: false,
  captcha: null
};
export const STATE_WITH_FETCHING_TRUE: AuthState = {...INITIAL_STATE, fetching: true};
export const STATE_WITH_CURRENT_USER: AuthState = {...INITIAL_STATE, userId: USER_ID, email: EMAIL, login: LOGIN};
export const STATE_WITH_CAPTCHA: AuthState = {...INITIAL_STATE, captcha: CAPTCHA_URL};
export const STATE_WITH_UPDATING_TRUE: AuthState = {...INITIAL_STATE, updating: true};

export const ROOT_STATE: Partial<RootState> = {
  auth: {...INITIAL_STATE},
  users: {relation: Relation.ALL} as UsersState
};
export const ROOT_STATE_WITH_RELATION_FRIENDS: Partial<RootState> = {
  ...ROOT_STATE,
  users: {...ROOT_STATE.users, relation: Relation.FRIENDS} as UsersState
};

export const SUCCESS_GET_CURRENT_USER_RESPONSE: GetCurrentUserResponse = {
  data: {id: USER_ID, email: EMAIL, login: LOGIN},
  resultCode: ResultCode.SUCCESS,
  messages: []
};
export const ERROR_GET_CURRENT_USER_RESPONSE: GetCurrentUserResponse = {
  resultCode: ResultCode.ERROR,
  messages: [ERROR_MESSAGE]
};

export const SUCCESS_GET_CAPTCHA_RESPONSE: GetCaptchaResponse = {url: CAPTCHA_URL};
export const SUCCESS_LOGIN_RESPONSE: LoginResponse = {
  data: {userId: USER_ID},
  resultCode: ResultCode.SUCCESS,
  messages: []
};
export const CAPTCHA_REQUIRED_LOGIN_RESPONSE: LoginResponse = {
  resultCode: CaptchaResultCode.CAPTCHA_REQUIRED,
  messages: [ERROR_MESSAGE]
};

export const ERROR_LOGIN_RESPONSE: LoginResponse = {resultCode: ResultCode.ERROR, messages: [ERROR_MESSAGE]};
export const SUCCESS_LOGOUT_RESPONSE: LogoutResponse = {data: {}, resultCode: ResultCode.SUCCESS, messages: []};
export const ERROR_LOGOUT_RESPONSE: LogoutResponse = {
  data: {},
  resultCode: ResultCode.ERROR,
  messages: [ERROR_MESSAGE]
};

export const EMPTY_ACTION = {} as AuthAction;
export const SET_FETCHING_TRUE_ACTION: AuthAction = {type: SET_FETCHING, payload: {fetching: true}};
export const SET_FETCHING_FALSE_ACTION: AuthAction = {type: SET_FETCHING, payload: {fetching: false}};
export const SET_UPDATING_TRUE_ACTION: AuthAction = {type: SET_UPDATING, payload: {updating: true}};
export const SET_UPDATING_FALSE_ACTION: AuthAction = {type: SET_UPDATING, payload: {updating: false}};
export const SET_CURRENT_USER_ACTION: AuthAction = {
  type: SET_CURRENT_USER,
  payload: {userId: USER_ID, email: EMAIL, login: LOGIN}
};
export const SET_CURRENT_USER_EMPTY_ACTION: AuthAction = {
  type: SET_CURRENT_USER,
  payload: {email: null, userId: null, login: null}
};
export const SET_CAPTCHA_ACTION: AuthAction = {type: SET_CAPTCHA, payload: {captcha: CAPTCHA_URL}};
export const SET_CAPTCHA_EMPTY_ACTION: AuthAction = {type: SET_CAPTCHA, payload: {captcha: null}};

export const LOGIN_PARAM: LoginData = {
  email: EMAIL,
  password: PASSWORD,
  rememberMe: true,
  captcha: CAPTCHA
};
