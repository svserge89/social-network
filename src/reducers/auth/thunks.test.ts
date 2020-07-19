import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import authAPI from '../../api/auth';
import securityAPI from '../../api/security';
import {getCaptcha, getCurrentUser, login, logout} from './thunks';
import {RootState} from '../../store/types';
import {AuthAction} from './types';
import {ErrorAction} from '../error/types';
import {UsersAction} from '../users/types';
import {
  TEST_CAPTCHA,
  TEST_CAPTCHA_REQUIRED_LOGIN_RESPONSE,
  TEST_EMAIL,
  TEST_ERROR_GET_CURRENT_USER_RESPONSE,
  TEST_ERROR_LOGIN_RESPONSE,
  TEST_ERROR_LOGOUT_RESPONSE,
  TEST_ERROR_RESPONSE,
  TEST_FORM_ERROR_EXCEPTION,
  TEST_LOGIN_PARAM,
  TEST_PASSWORD,
  TEST_ROOT_STATE,
  TEST_ROOT_STATE_WITH_RELATION_FRIENDS,
  TEST_SET_CAPTCHA_ACTION,
  TEST_SET_CAPTCHA_EMPTY_ACTION,
  TEST_SET_CURRENT_USER_ACTION,
  TEST_SET_CURRENT_USER_EMPTY_ACTION,
  TEST_SET_FETCHING_FALSE_ACTION,
  TEST_SET_FETCHING_TRUE_ACTION,
  TEST_SET_UPDATING_FALSE_ACTION,
  TEST_SET_UPDATING_TRUE_ACTION,
  TEST_SUCCESS_GET_CAPTCHA_RESPONSE,
  TEST_SUCCESS_GET_CURRENT_USER_RESPONSE,
  TEST_SUCCESS_LOGIN_RESPONSE,
  TEST_SUCCESS_LOGOUT_RESPONSE
} from './__testing__/test-data';
import {TEST_SET_ERROR_ACTION, TEST_SET_ERROR_STATUS_ACTION} from '../error/__testing__/test-data';
import {TEST_SET_RELATION_ALL_ACTION} from '../users/__testing__/test-data';
import {DispatchExts} from './__testing__/types';

const mockStore = configureMockStore<Partial<RootState>, DispatchExts>([thunk]);

describe('auth thunk actions', () => {
  const store = mockStore(TEST_ROOT_STATE);
  const spyGetCaptcha = jest.spyOn(securityAPI, 'getCaptcha');
  const spyGetCurrentUser = jest.spyOn(authAPI, 'getCurrentUser');

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  describe('getCurrentUser thunk', () => {
    it('should dispatch actions when success response', async () => {
      spyGetCurrentUser.mockResolvedValue(TEST_SUCCESS_GET_CURRENT_USER_RESPONSE);
      await store.dispatch(getCurrentUser());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<AuthAction[]>([
        TEST_SET_FETCHING_TRUE_ACTION,
        TEST_SET_CURRENT_USER_ACTION,
        TEST_SET_FETCHING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when success response', async () => {
      spyGetCurrentUser.mockRejectedValue(TEST_ERROR_RESPONSE);
      await store.dispatch(getCurrentUser());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        TEST_SET_FETCHING_TRUE_ACTION,
        TEST_SET_ERROR_ACTION,
        TEST_SET_FETCHING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when error result code', async () => {
      spyGetCurrentUser.mockResolvedValue(TEST_ERROR_GET_CURRENT_USER_RESPONSE);
      await store.dispatch(getCurrentUser());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        TEST_SET_FETCHING_TRUE_ACTION,
        TEST_SET_ERROR_STATUS_ACTION,
        TEST_SET_FETCHING_FALSE_ACTION
      ]);
    });
  });

  describe('getCaptcha thunk', () => {
    it('should dispatch action when success response', async () => {
      spyGetCaptcha.mockResolvedValue(TEST_SUCCESS_GET_CAPTCHA_RESPONSE);
      await store.dispatch(getCaptcha());

      expect(spyGetCaptcha).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<AuthAction[]>([TEST_SET_CAPTCHA_ACTION]);
    });

    it('should dispatch action when error response', async () => {
      spyGetCaptcha.mockRejectedValue(TEST_ERROR_RESPONSE);
      await store.dispatch(getCaptcha());

      expect(spyGetCaptcha).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<ErrorAction[]>([TEST_SET_ERROR_ACTION]);
    });
  });

  describe('login thunk', () => {
    const spyLogin = jest.spyOn(authAPI, 'login');

    it('should dispatch actions when success response', async () => {
      spyLogin.mockResolvedValue(TEST_SUCCESS_LOGIN_RESPONSE);
      spyGetCurrentUser.mockResolvedValue(TEST_SUCCESS_GET_CURRENT_USER_RESPONSE);
      await store.dispatch(login(TEST_LOGIN_PARAM));

      expect(spyLogin).toBeCalledTimes(1);
      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(spyGetCaptcha).not.toBeCalled();
      expect(store.getActions()).toEqual<AuthAction[]>([
        TEST_SET_UPDATING_TRUE_ACTION,
        TEST_SET_FETCHING_TRUE_ACTION,
        TEST_SET_CURRENT_USER_ACTION,
        TEST_SET_FETCHING_FALSE_ACTION,
        TEST_SET_CAPTCHA_EMPTY_ACTION,
        TEST_SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions and throw error when captcha required', async () => {
      spyLogin.mockResolvedValue(TEST_CAPTCHA_REQUIRED_LOGIN_RESPONSE);
      spyGetCaptcha.mockResolvedValue(TEST_SUCCESS_GET_CAPTCHA_RESPONSE);

      let thrownError;

      try {
        await store.dispatch(login(TEST_LOGIN_PARAM));
      } catch (error) {
        thrownError = error;
      }

      expect(spyLogin).toBeCalledTimes(1);
      expect(spyGetCurrentUser).not.toBeCalled();
      expect(spyGetCaptcha).toBeCalledTimes(1);
      expect(thrownError).toEqual(TEST_FORM_ERROR_EXCEPTION);
      expect(store.getActions()).toEqual<AuthAction[]>([
        TEST_SET_UPDATING_TRUE_ACTION,
        TEST_SET_CAPTCHA_ACTION,
        TEST_SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions and throw error when error result code', async () => {
      spyLogin.mockResolvedValue(TEST_ERROR_LOGIN_RESPONSE);

      let thrownError;

      try {
        await store.dispatch(login(TEST_LOGIN_PARAM));
      } catch (error) {
        thrownError = error;
      }

      expect(spyLogin).toBeCalledTimes(1);
      expect(spyGetCurrentUser).not.toBeCalled();
      expect(spyGetCaptcha).not.toBeCalled();
      expect(thrownError).toEqual(TEST_FORM_ERROR_EXCEPTION);
      expect(store.getActions()).toEqual<AuthAction[]>([
        TEST_SET_UPDATING_TRUE_ACTION,
        TEST_SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when error response', async () => {
      spyLogin.mockRejectedValue(TEST_ERROR_RESPONSE);
      await store.dispatch(login(TEST_LOGIN_PARAM));

      expect(spyLogin).toBeCalledTimes(1);
      expect(spyLogin).toBeCalledWith(TEST_EMAIL, TEST_PASSWORD, TEST_LOGIN_PARAM.rememberMe, TEST_CAPTCHA);
      expect(spyGetCurrentUser).not.toBeCalled();
      expect(spyGetCaptcha).not.toBeCalled();
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        TEST_SET_UPDATING_TRUE_ACTION,
        TEST_SET_ERROR_ACTION,
        TEST_SET_UPDATING_FALSE_ACTION
      ]);
    });
  });

  describe('logout thunk', () => {
    const spyLogout = jest.spyOn(authAPI, 'logout');

    it('should dispatch actions when success response', async () => {
      spyLogout.mockResolvedValue(TEST_SUCCESS_LOGOUT_RESPONSE);
      await store.dispatch(logout());

      expect(spyLogout).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<AuthAction[]>([
        TEST_SET_UPDATING_TRUE_ACTION,
        TEST_SET_CURRENT_USER_EMPTY_ACTION,
        TEST_SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when success response and relation not set to all', async () => {
      const store = mockStore(TEST_ROOT_STATE_WITH_RELATION_FRIENDS);

      spyLogout.mockResolvedValue(TEST_SUCCESS_LOGOUT_RESPONSE);
      await store.dispatch(logout());

      expect(spyLogout).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | UsersAction)[]>([
        TEST_SET_UPDATING_TRUE_ACTION,
        TEST_SET_CURRENT_USER_EMPTY_ACTION,
        TEST_SET_RELATION_ALL_ACTION,
        TEST_SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when error result code', async () => {
      spyLogout.mockResolvedValue(TEST_ERROR_LOGOUT_RESPONSE);
      await store.dispatch(logout());

      expect(spyLogout).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        TEST_SET_UPDATING_TRUE_ACTION,
        TEST_SET_ERROR_STATUS_ACTION,
        TEST_SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when error response', async () => {
      spyLogout.mockRejectedValue(TEST_ERROR_RESPONSE);
      await store.dispatch(logout());

      expect(spyLogout).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        TEST_SET_UPDATING_TRUE_ACTION,
        TEST_SET_ERROR_ACTION,
        TEST_SET_UPDATING_FALSE_ACTION
      ]);
    });
  });
});
