import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import authAPI from '../../../api/auth';
import securityAPI from '../../../api/security';
import {getCaptcha, getCurrentUser, login, logout} from '../thunks';
import {RootState} from '../../../store/types';
import {AuthAction} from '../types';
import {ErrorAction} from '../../error/types';
import {UsersAction} from '../../users/types';
import {
  CAPTCHA,
  CAPTCHA_REQUIRED_LOGIN_RESPONSE,
  EMAIL,
  ERROR_GET_CURRENT_USER_RESPONSE,
  ERROR_LOGIN_RESPONSE,
  ERROR_LOGOUT_RESPONSE,
  ERROR_RESPONSE,
  FORM_ERROR_EXCEPTION,
  LOGIN_PARAM,
  PASSWORD,
  ROOT_STATE,
  ROOT_STATE_WITH_RELATION_FRIENDS,
  SET_CAPTCHA_ACTION,
  SET_CAPTCHA_EMPTY_ACTION,
  SET_CURRENT_USER_ACTION,
  SET_CURRENT_USER_EMPTY_ACTION,
  SET_FETCHING_FALSE_ACTION,
  SET_FETCHING_TRUE_ACTION,
  SET_UPDATING_FALSE_ACTION,
  SET_UPDATING_TRUE_ACTION,
  SUCCESS_GET_CAPTCHA_RESPONSE,
  SUCCESS_GET_CURRENT_USER_RESPONSE,
  SUCCESS_LOGIN_RESPONSE,
  SUCCESS_LOGOUT_RESPONSE
} from '../__fixtures__/data';
import {SET_ERROR_ACTION, SET_ERROR_STATUS_ACTION} from '../../error/__fixtures__/data';
import {SET_RELATION_ALL_ACTION} from '../../users/__fixtures__/data';
import {DispatchExts} from '../__fixtures__/types';

const mockStore = configureMockStore<Partial<RootState>, DispatchExts>([thunk]);

describe('auth thunk actions', () => {
  const store = mockStore(ROOT_STATE);
  const spyGetCaptcha = jest.spyOn(securityAPI, 'getCaptcha');
  const spyGetCurrentUser = jest.spyOn(authAPI, 'getCurrentUser');

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  describe('getCurrentUser thunk', () => {
    it('should dispatch actions when success response', async () => {
      spyGetCurrentUser.mockResolvedValue(SUCCESS_GET_CURRENT_USER_RESPONSE);
      await store.dispatch(getCurrentUser());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<AuthAction[]>([
        SET_FETCHING_TRUE_ACTION,
        SET_CURRENT_USER_ACTION,
        SET_FETCHING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when success response', async () => {
      spyGetCurrentUser.mockRejectedValue(ERROR_RESPONSE);
      await store.dispatch(getCurrentUser());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        SET_FETCHING_TRUE_ACTION,
        SET_ERROR_ACTION,
        SET_FETCHING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when error result code', async () => {
      spyGetCurrentUser.mockResolvedValue(ERROR_GET_CURRENT_USER_RESPONSE);
      await store.dispatch(getCurrentUser());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        SET_FETCHING_TRUE_ACTION,
        SET_ERROR_STATUS_ACTION,
        SET_FETCHING_FALSE_ACTION
      ]);
    });
  });

  describe('getCaptcha thunk', () => {
    it('should dispatch action when success response', async () => {
      spyGetCaptcha.mockResolvedValue(SUCCESS_GET_CAPTCHA_RESPONSE);
      await store.dispatch(getCaptcha());

      expect(spyGetCaptcha).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<AuthAction[]>([SET_CAPTCHA_ACTION]);
    });

    it('should dispatch action when error response', async () => {
      spyGetCaptcha.mockRejectedValue(ERROR_RESPONSE);
      await store.dispatch(getCaptcha());

      expect(spyGetCaptcha).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<ErrorAction[]>([SET_ERROR_ACTION]);
    });
  });

  describe('login thunk', () => {
    const spyLogin = jest.spyOn(authAPI, 'login');

    it('should dispatch actions when success response', async () => {
      spyLogin.mockResolvedValue(SUCCESS_LOGIN_RESPONSE);
      spyGetCurrentUser.mockResolvedValue(SUCCESS_GET_CURRENT_USER_RESPONSE);
      await store.dispatch(login(LOGIN_PARAM));

      expect(spyLogin).toBeCalledTimes(1);
      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(spyGetCaptcha).not.toBeCalled();
      expect(store.getActions()).toEqual<AuthAction[]>([
        SET_UPDATING_TRUE_ACTION,
        SET_FETCHING_TRUE_ACTION,
        SET_CURRENT_USER_ACTION,
        SET_FETCHING_FALSE_ACTION,
        SET_CAPTCHA_EMPTY_ACTION,
        SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions and throw error when captcha required', async () => {
      spyLogin.mockResolvedValue(CAPTCHA_REQUIRED_LOGIN_RESPONSE);
      spyGetCaptcha.mockResolvedValue(SUCCESS_GET_CAPTCHA_RESPONSE);

      let thrownError;

      try {
        await store.dispatch(login(LOGIN_PARAM));
      } catch (error) {
        thrownError = error;
      }

      expect(spyLogin).toBeCalledTimes(1);
      expect(spyGetCurrentUser).not.toBeCalled();
      expect(spyGetCaptcha).toBeCalledTimes(1);
      expect(thrownError).toEqual(FORM_ERROR_EXCEPTION);
      expect(store.getActions()).toEqual<AuthAction[]>([
        SET_UPDATING_TRUE_ACTION,
        SET_CAPTCHA_ACTION,
        SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions and throw error when error result code', async () => {
      spyLogin.mockResolvedValue(ERROR_LOGIN_RESPONSE);

      let thrownError;

      try {
        await store.dispatch(login(LOGIN_PARAM));
      } catch (error) {
        thrownError = error;
      }

      expect(spyLogin).toBeCalledTimes(1);
      expect(spyGetCurrentUser).not.toBeCalled();
      expect(spyGetCaptcha).not.toBeCalled();
      expect(thrownError).toEqual(FORM_ERROR_EXCEPTION);
      expect(store.getActions()).toEqual<AuthAction[]>([SET_UPDATING_TRUE_ACTION, SET_UPDATING_FALSE_ACTION]);
    });

    it('should dispatch actions when error response', async () => {
      spyLogin.mockRejectedValue(ERROR_RESPONSE);
      await store.dispatch(login(LOGIN_PARAM));

      expect(spyLogin).toBeCalledTimes(1);
      expect(spyLogin).toBeCalledWith(EMAIL, PASSWORD, LOGIN_PARAM.rememberMe, CAPTCHA);
      expect(spyGetCurrentUser).not.toBeCalled();
      expect(spyGetCaptcha).not.toBeCalled();
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        SET_UPDATING_TRUE_ACTION,
        SET_ERROR_ACTION,
        SET_UPDATING_FALSE_ACTION
      ]);
    });
  });

  describe('logout thunk', () => {
    const spyLogout = jest.spyOn(authAPI, 'logout');

    it('should dispatch actions when success response', async () => {
      spyLogout.mockResolvedValue(SUCCESS_LOGOUT_RESPONSE);
      await store.dispatch(logout());

      expect(spyLogout).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<AuthAction[]>([
        SET_UPDATING_TRUE_ACTION,
        SET_CURRENT_USER_EMPTY_ACTION,
        SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when success response and relation not set to all', async () => {
      const store = mockStore(ROOT_STATE_WITH_RELATION_FRIENDS);

      spyLogout.mockResolvedValue(SUCCESS_LOGOUT_RESPONSE);
      await store.dispatch(logout());

      expect(spyLogout).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | UsersAction)[]>([
        SET_UPDATING_TRUE_ACTION,
        SET_CURRENT_USER_EMPTY_ACTION,
        SET_RELATION_ALL_ACTION,
        SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when error result code', async () => {
      spyLogout.mockResolvedValue(ERROR_LOGOUT_RESPONSE);
      await store.dispatch(logout());

      expect(spyLogout).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        SET_UPDATING_TRUE_ACTION,
        SET_ERROR_STATUS_ACTION,
        SET_UPDATING_FALSE_ACTION
      ]);
    });

    it('should dispatch actions when error response', async () => {
      spyLogout.mockRejectedValue(ERROR_RESPONSE);
      await store.dispatch(logout());

      expect(spyLogout).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        SET_UPDATING_TRUE_ACTION,
        SET_ERROR_ACTION,
        SET_UPDATING_FALSE_ACTION
      ]);
    });
  });
});
