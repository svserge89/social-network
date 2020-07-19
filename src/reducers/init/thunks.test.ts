import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import authAPI from '../../api/auth';
import {RootState} from '../../store/types';
import {initialization} from './thunks';
import {InitAction} from './types';
import {AuthAction} from '../auth/types';
import {ErrorAction} from '../error/types';
import {
  TEST_ERROR_RESPONSE,
  TEST_SET_CURRENT_USER_ACTION,
  TEST_SET_FETCHING_FALSE_ACTION,
  TEST_SET_FETCHING_TRUE_ACTION,
  TEST_SUCCESS_GET_CURRENT_USER_RESPONSE
} from '../auth/__testing__/test-data';
import {TEST_ROOT_STATE, TEST_SET_INITIALIZED_ACTION} from './__testing__/test-data';
import {TEST_SET_ERROR_ACTION} from '../error/__testing__/test-data';
import {DispatchExts} from './__testing__/types';

const mockStore = configureMockStore<Partial<RootState>, DispatchExts>([thunk]);

describe('init thunk actions', () => {
  const store = mockStore(TEST_ROOT_STATE);

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  describe('initialization thunk', () => {
    const spyGetCurrentUser = jest.spyOn(authAPI, 'getCurrentUser');

    it('should dispatch actions when success response', async () => {
      spyGetCurrentUser.mockResolvedValue(TEST_SUCCESS_GET_CURRENT_USER_RESPONSE);
      await store.dispatch(initialization());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(InitAction | AuthAction)[]>([
        TEST_SET_FETCHING_TRUE_ACTION,
        TEST_SET_CURRENT_USER_ACTION,
        TEST_SET_FETCHING_FALSE_ACTION,
        TEST_SET_INITIALIZED_ACTION
      ]);
    });

    it('should dispatch actions when error response', async () => {
      spyGetCurrentUser.mockRejectedValue(TEST_ERROR_RESPONSE);
      await store.dispatch(initialization());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(InitAction | AuthAction | ErrorAction)[]>([
        TEST_SET_FETCHING_TRUE_ACTION,
        TEST_SET_ERROR_ACTION,
        TEST_SET_FETCHING_FALSE_ACTION,
        TEST_SET_INITIALIZED_ACTION
      ]);
    });
  });
});
