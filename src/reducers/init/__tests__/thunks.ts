import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import authAPI from '../../../api/auth';
import {RootState} from '../../../store/types';
import {initialization} from '../thunks';
import {AuthAction} from '../../auth/types';
import {ErrorAction} from '../../error/types';
import {
  SET_CURRENT_USER_ACTION,
  SUCCESS_GET_CURRENT_USER_RESPONSE,
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
      await testInitialization(SET_CURRENT_USER_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyGetCurrentUser.mockRejectedValue(ERROR_RESPONSE);
      await testInitialization(SET_ERROR_ACTION);
    });

    async function testInitialization(
      expectedAction: AuthAction | ErrorAction
    ): Promise<void> {
      await store.dispatch(initialization());

      const actions = store.getActions();

      expect(spyGetCurrentUser).toBeCalledTimes(1);
      expect(actions).toContainEqual(expectedAction);
      expect(actions[actions.length - 1]).toEqual(SET_INITIALIZED_TRUE_ACTION);
    }
  });
});
