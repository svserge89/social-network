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
  LOGIN_PARAM,
  PASSWORD,
  ROOT_STATE,
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
  SUCCESS_LOGOUT_RESPONSE,
} from '../__fixtures__/data';
import {
  ERROR_RESPONSE,
  FORM_ERROR_EXCEPTION,
  SET_ERROR_ACTION,
  SET_ERROR_STATUS_ACTION,
} from '../../error/__fixtures__/data';
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
      await testGetCurrentUser(SET_CURRENT_USER_ACTION);
    });

    it('should dispatch actions when success response', async () => {
      spyGetCurrentUser.mockRejectedValue(ERROR_RESPONSE);
      await testGetCurrentUser(SET_ERROR_ACTION);
    });

    it('should dispatch actions when error result code', async () => {
      spyGetCurrentUser.mockResolvedValue(ERROR_GET_CURRENT_USER_RESPONSE);
      await testGetCurrentUser();
    });

    async function testGetCurrentUser(
      ...expectedActions: (AuthAction | ErrorAction)[]
    ): Promise<void> {
      await store.dispatch(getCurrentUser());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        SET_FETCHING_TRUE_ACTION,
        ...expectedActions,
        SET_FETCHING_FALSE_ACTION,
      ]);
    }
  });

  describe('getCaptcha thunk', () => {
    it('should dispatch action when success response', async () => {
      spyGetCaptcha.mockResolvedValue(SUCCESS_GET_CAPTCHA_RESPONSE);
      await testGetCaptcha(SET_CAPTCHA_ACTION);
    });

    it('should dispatch action when error response', async () => {
      spyGetCaptcha.mockRejectedValue(ERROR_RESPONSE);
      await testGetCaptcha(SET_ERROR_ACTION);
    });

    async function testGetCaptcha(
      expectedAction: AuthAction | ErrorAction
    ): Promise<void> {
      await store.dispatch(getCaptcha());

      expect(spyGetCaptcha).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        expectedAction,
      ]);
    }
  });

  describe('login thunk', () => {
    const spyLogin = jest.spyOn(authAPI, 'login');

    it('should dispatch actions when success response', async () => {
      spyLogin.mockResolvedValue(SUCCESS_LOGIN_RESPONSE);
      spyGetCurrentUser.mockResolvedValue(SUCCESS_GET_CURRENT_USER_RESPONSE);
      await testLogin([
        SET_FETCHING_TRUE_ACTION,
        SET_CURRENT_USER_ACTION,
        SET_FETCHING_FALSE_ACTION,
        SET_CAPTCHA_EMPTY_ACTION,
      ]);

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(spyGetCaptcha).not.toBeCalled();
    });

    it('should dispatch actions and throw error when captcha required', async () => {
      spyLogin.mockResolvedValue(CAPTCHA_REQUIRED_LOGIN_RESPONSE);
      spyGetCaptcha.mockResolvedValue(SUCCESS_GET_CAPTCHA_RESPONSE);
      await testLogin([SET_CAPTCHA_ACTION], true);

      expect(spyGetCurrentUser).not.toBeCalled();
      expect(spyGetCaptcha).toBeCalledTimes(1);
    });

    it('should dispatch actions and throw error when error result code', async () => {
      spyLogin.mockResolvedValue(ERROR_LOGIN_RESPONSE);
      await testLogin([], true);

      expect(spyGetCurrentUser).not.toBeCalled();
      expect(spyGetCaptcha).not.toBeCalled();
    });

    it('should dispatch actions when error response', async () => {
      spyLogin.mockRejectedValue(ERROR_RESPONSE);
      await testLogin([SET_ERROR_ACTION]);

      expect(spyGetCurrentUser).not.toBeCalled();
      expect(spyGetCaptcha).not.toBeCalled();
    });

    async function testLogin(
      expectedActions: (AuthAction | ErrorAction)[],
      expectError: boolean = false
    ): Promise<void> {
      let thrownError;

      try {
        await store.dispatch(login(LOGIN_PARAM));
      } catch (error) {
        if (expectError) {
          thrownError = error;
        } else {
          throw error;
        }
      }

      expect(spyLogin).toBeCalledTimes(1);
      expect(spyLogin).toBeCalledWith(
        EMAIL,
        PASSWORD,
        LOGIN_PARAM.rememberMe,
        CAPTCHA
      );

      if (expectError) {
        expect(thrownError).toEqual(FORM_ERROR_EXCEPTION);
      }

      expect(store.getActions()).toEqual<(AuthAction | ErrorAction)[]>([
        SET_UPDATING_TRUE_ACTION,
        ...expectedActions,
        SET_UPDATING_FALSE_ACTION,
      ]);
    }
  });

  describe('logout thunk', () => {
    const spyLogout = jest.spyOn(authAPI, 'logout');

    it('should dispatch actions when success response', async () => {
      spyLogout.mockResolvedValue(SUCCESS_LOGOUT_RESPONSE);
      await testLogout([SET_CURRENT_USER_EMPTY_ACTION]);
    });

    it('should dispatch actions when error result code', async () => {
      spyLogout.mockResolvedValue(ERROR_LOGOUT_RESPONSE);
      await testLogout([SET_ERROR_STATUS_ACTION]);
    });

    it('should dispatch actions when error response', async () => {
      spyLogout.mockRejectedValue(ERROR_RESPONSE);
      await testLogout([SET_ERROR_ACTION]);
    });

    async function testLogout(
      expectedActions: (AuthAction | UsersAction | ErrorAction)[],
      localStore: ReturnType<typeof mockStore> = store
    ): Promise<void> {
      await localStore.dispatch(logout());

      expect(spyLogout).toBeCalledTimes(1);
      expect(localStore.getActions()).toEqual<
        (AuthAction | UsersAction | ErrorAction)[]
      >([
        SET_UPDATING_TRUE_ACTION,
        ...expectedActions,
        SET_UPDATING_FALSE_ACTION,
      ]);
    }
  });
});
