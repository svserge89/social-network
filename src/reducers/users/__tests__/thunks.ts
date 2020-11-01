import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import usersAPI from '../../../api/users';
import followAPI from '../../../api/follow';
import {RootState} from '../../../store/types';
import {cleanUsers, follow, getUsers, unfollow} from '../thunks';
import {Relation, UsersAction} from '../types';
import {ErrorAction} from '../../error/types';
import {DispatchExts} from '../__fixtures__/types';
import {
  ERROR_FOLLOW_RESPONSE,
  ERROR_GET_USERS_RESPONSE,
  ERROR_UNFOLLOW_RESPONSE,
  FILTER,
  PAGE,
  ROOT_STATE,
  SET_FETCHING_FALSE_ACTION,
  SET_FETCHING_TRUE_ACTION,
  SET_FILTER_EMPTY_ACTION,
  SET_FOLLOW_ACTION,
  SET_FOLLOWING_FALSE_ACTION,
  SET_FOLLOWING_TRUE_ACTION,
  SET_RELATION_ALL_ACTION,
  SET_SIZE_EMPTY_ACTION,
  SET_UNFOLLOW_ACTION,
  SET_USERS_ACTION,
  SET_USERS_EMPTY_ACTION,
  SIZE,
  SUCCESS_FOLLOW_RESPONSE,
  SUCCESS_GET_USERS_RESPONSE,
  SUCCESS_UNFOLLOW_RESPONSE,
  USER_ID,
} from '../__fixtures__/data';
import {
  ERROR_RESPONSE,
  SET_ERROR_ACTION,
  SET_ERROR_STATUS_ACTION,
} from '../../error/__fixtures__/data';

const mockStore = configureMockStore<Partial<RootState>, DispatchExts>([thunk]);

describe('users thunk actions', () => {
  const store = mockStore(ROOT_STATE);

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  describe('getUsers thunk', () => {
    const spyGet = jest.spyOn(usersAPI, 'get');

    it('should dispatch actions when success response', async () => {
      spyGet.mockResolvedValue(SUCCESS_GET_USERS_RESPONSE);
      await testGetUsers(SET_USERS_ACTION);
    });

    it('should dispatch actions when error message', async () => {
      spyGet.mockResolvedValue(ERROR_GET_USERS_RESPONSE);
      await testGetUsers(SET_ERROR_STATUS_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyGet.mockRejectedValue(ERROR_RESPONSE);
      await testGetUsers(SET_ERROR_ACTION);
    });

    async function testGetUsers(
      expectedAction: UsersAction | ErrorAction
    ): Promise<void> {
      await store.dispatch(getUsers(PAGE, SIZE, Relation.ALL, FILTER));

      expect(spyGet).toBeCalledTimes(1);
      expect(spyGet).toBeCalledWith(SIZE, PAGE, Relation.ALL, FILTER);
      expect(store.getActions()).toEqual<(UsersAction | ErrorAction)[]>([
        SET_FETCHING_TRUE_ACTION,
        expectedAction,
        SET_FETCHING_FALSE_ACTION,
      ]);
    }
  });

  describe('cleanUsers thunk', () => {
    it('should dispatch action', () => {
      store.dispatch(cleanUsers());

      expect(store.getActions()).toEqual<UsersAction[]>([
        SET_USERS_EMPTY_ACTION,
        SET_SIZE_EMPTY_ACTION,
        SET_FILTER_EMPTY_ACTION,
        SET_RELATION_ALL_ACTION,
      ]);
    });
  });

  describe('follow thunk', () => {
    const spyFollow = jest.spyOn(followAPI, 'follow');

    it('should dispatch actions when success response', async () => {
      spyFollow.mockResolvedValue(SUCCESS_FOLLOW_RESPONSE);
      await testFollow(SET_FOLLOW_ACTION);
    });

    it('should dispatch actions when error result code', async () => {
      spyFollow.mockResolvedValue(ERROR_FOLLOW_RESPONSE);
      await testFollow(SET_ERROR_STATUS_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyFollow.mockRejectedValue(ERROR_RESPONSE);
      await testFollow(SET_ERROR_ACTION);
    });

    async function testFollow(
      expectedAction: UsersAction | ErrorAction
    ): Promise<void> {
      await store.dispatch(follow(USER_ID));

      expect(spyFollow).toBeCalledTimes(1);
      expect(spyFollow).toBeCalledWith(USER_ID);
      expect(store.getActions()).toEqual<(UsersAction | ErrorAction)[]>([
        SET_FOLLOWING_TRUE_ACTION,
        expectedAction,
        SET_FOLLOWING_FALSE_ACTION,
      ]);
    }
  });

  describe('unfollow thunk', () => {
    const spyUnFollow = jest.spyOn(followAPI, 'unFollow');

    it('should dispatch actions when success response', async () => {
      spyUnFollow.mockResolvedValue(SUCCESS_UNFOLLOW_RESPONSE);
      await testUnfollow(SET_UNFOLLOW_ACTION);
    });

    it('should dispatch actions when error result code', async () => {
      spyUnFollow.mockResolvedValue(ERROR_UNFOLLOW_RESPONSE);
      await testUnfollow(SET_ERROR_STATUS_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyUnFollow.mockRejectedValue(ERROR_RESPONSE);
      await testUnfollow(SET_ERROR_ACTION);
    });

    async function testUnfollow(
      expectedAction: UsersAction | ErrorAction
    ): Promise<void> {
      await store.dispatch(unfollow(USER_ID));

      expect(spyUnFollow).toBeCalledTimes(1);
      expect(spyUnFollow).toBeCalledWith(USER_ID);
      expect(store.getActions()).toEqual<(UsersAction | ErrorAction)[]>([
        SET_FOLLOWING_TRUE_ACTION,
        expectedAction,
        SET_FOLLOWING_FALSE_ACTION,
      ]);
    }
  });
});
