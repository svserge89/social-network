import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import authAPI from '../../../api/auth';
import {RootState} from '../../../store/types';
import {initialization} from '../thunks';
import {InitAction} from '../types';
import {AuthAction} from '../../auth/types';
import {ErrorAction} from '../../error/types';
import {
  SET_CURRENT_USER_ACTION,
  SET_FETCHING_FALSE_ACTION,
  SET_FETCHING_TRUE_ACTION,
  SUCCESS_GET_CURRENT_USER_RESPONSE
} from '../../auth/__fixtures__/data';
import {ROOT_STATE, SET_INITIALIZED_TRUE_ACTION} from '../__fixtures__/data';
import {ERROR_RESPONSE, SET_ERROR_ACTION} from '../../error/__fixtures__/data';
import {DispatchExts} from '../__fixtures__/types';

const mockStore = configureMockStore<Partial<RootState>, DispatchExts>([thunk]);

describe('init thunk actions', () => {
  const store = mockStore(ROOT_STATE);

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  describe('initialization thunk', () => {
    const spyGetCurrentUser = jest.spyOn(authAPI, 'getCurrentUser');

    it('should dispatch actions when success response', async () => {
      spyGetCurrentUser.mockResolvedValue(SUCCESS_GET_CURRENT_USER_RESPONSE);
      await store.dispatch(initialization());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(InitAction | AuthAction)[]>([
        SET_FETCHING_TRUE_ACTION,
        SET_CURRENT_USER_ACTION,
        SET_FETCHING_FALSE_ACTION,
        SET_INITIALIZED_TRUE_ACTION
      ]);
    });

    it('should dispatch actions when error response', async () => {
      spyGetCurrentUser.mockRejectedValue(ERROR_RESPONSE);
      await store.dispatch(initialization());

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(store.getActions()).toEqual<(InitAction | AuthAction | ErrorAction)[]>([
        SET_FETCHING_TRUE_ACTION,
        SET_ERROR_ACTION,
        SET_FETCHING_FALSE_ACTION,
        SET_INITIALIZED_TRUE_ACTION
      ]);
    });
  });
});
