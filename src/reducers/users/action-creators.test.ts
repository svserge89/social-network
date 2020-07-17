import {
  FOLLOW,
  Relation,
  SET_FETCHING,
  SET_FILTER,
  SET_FOLLOWING,
  SET_PAGE,
  SET_RELATION,
  SET_SIZE,
  SET_USERS,
  UNFOLLOW,
  UsersAction
} from './types';
import {
  setFetching,
  setFilter,
  setFollow,
  setFollowing,
  setPage,
  setRelation,
  setSize,
  setUnfollow,
  setUsers
} from './action-creators';
import {TEST_USERS} from './__testing__/test-data';

describe('users action creators', () => {
  it('should create an action to set follow user', () => {
    expect(setFollow(42)).toEqual<UsersAction>({type: FOLLOW, payload: {userId: 42}});
  });

  it('should create an action to set unfollow user', () => {
    expect(setUnfollow(42)).toEqual<UsersAction>({type: UNFOLLOW, payload: {userId: 42}});
  });

  it('should create an action to set users', () => {
    const users = [...TEST_USERS];

    expect(setUsers(users, 42)).toEqual<UsersAction>({type: SET_USERS, payload: {users, total: 42}});
  });

  it('should create an action to set page', () => {
    expect(setPage(42)).toEqual<UsersAction>({type: SET_PAGE, payload: {page: 42}});
  });

  it('should create an action to set page size', () => {
    expect(setSize(42)).toEqual<UsersAction>({type: SET_SIZE, payload: {size: 42, page: 1}});
  });

  it('should create an action to set fetching', () => {
    expect(setFetching(true)).toEqual<UsersAction>({type: SET_FETCHING, payload: {fetching: true}});
    expect(setFetching(false)).toEqual<UsersAction>({type: SET_FETCHING, payload: {fetching: false}});
  });

  it('should create an action to set following', () => {
    expect(setFollowing(true, 42))
      .toEqual<UsersAction>({type: SET_FOLLOWING, payload: {userId: 42, status: true}});
    expect(setFollowing(false, 42))
      .toEqual<UsersAction>({type: SET_FOLLOWING, payload: {userId: 42, status: false}});
  });

  it('should create an action to set relation', () => {
    expect(setRelation(Relation.FRIENDS))
      .toEqual<UsersAction>({type: SET_RELATION, payload: {relation: Relation.FRIENDS, page: 1}});
  });

  it('should create an action to set filter', () => {
    expect(setFilter('test filter'))
      .toEqual<UsersAction>({type: SET_FILTER, payload: {filter: 'test filter', page: 1}});
  });
});
