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
  SetFetchingAction,
  SetFilterAction,
  SetFollowAction,
  SetFollowingAction,
  SetPageAction,
  SetRelationAction,
  SetSizeAction,
  SetUnfollowAction,
  SetUsersAction,
  UNFOLLOW
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
} from './actionCreators';
import {User} from '../../models/types';

it('should create an action to set follow user', () => {
  const expected: SetFollowAction = {type: FOLLOW, payload: {userId: 42}};

  expect(setFollow(42)).toEqual(expected);
});

it('should create an action to set unfollow user', () => {
  const expected: SetUnfollowAction = {type: UNFOLLOW, payload: {userId: 42}};

  expect(setUnfollow(42)).toEqual(expected);
});

it('should create an action to set users', () => {
  const users: User[] = [
    {
      id: 1,
      name: 'test user 1',
      status: 'test status 1',
      photos: {large: 'test/large/photo1', small: 'test/small/photo1'},
      followed: true
    },
    {
      id: 2,
      name: 'test user 2',
      status: 'test status 2',
      photos: {large: 'test/large/photo2', small: 'test/small/photo2'},
      followed: false
    },
    {
      id: 3,
      name: 'test user 3',
      status: null,
      photos: {large: null, small: null},
      followed: false
    }
  ];
  const expected: SetUsersAction = {type: SET_USERS, payload: {users, total: 42}};

  expect(setUsers(users, 42)).toEqual(expected);
});

it('should create an action to set page', () => {
  const expected: SetPageAction = {type: SET_PAGE, payload: {page: 42}};

  expect(setPage(42)).toEqual(expected);
});

it('should create an action to set page size', () => {
  const expected: SetSizeAction = {type: SET_SIZE, payload: {size: 42, page: 1}};

  expect(setSize(42)).toEqual(expected);
});

it('should create an action to set fetching', () => {
  const expectedTrue: SetFetchingAction = {type: SET_FETCHING, payload: {fetching: true}};
  const expectedFalse: SetFetchingAction = {type: SET_FETCHING, payload: {fetching: false}};

  expect(setFetching(true)).toEqual(expectedTrue);
  expect(setFetching(false)).toEqual(expectedFalse);
});

it('should create an action to set following', () => {
  const expectedTrue: SetFollowingAction = {type: SET_FOLLOWING, payload: {userId: 42, status: true}};
  const expectedFalse: SetFollowingAction = {type: SET_FOLLOWING, payload: {userId: 42, status: false}};

  expect(setFollowing(true, 42)).toEqual(expectedTrue);
  expect(setFollowing(false, 42)).toEqual(expectedFalse);
});

it('should create an action to set relation', () => {
  const expected: SetRelationAction = {type: SET_RELATION, payload: {relation: Relation.FRIENDS, page: 1}};

  expect(setRelation(Relation.FRIENDS)).toEqual(expected);
});

it('should create an action to set filter', () => {
  const expected: SetFilterAction = {type: SET_FILTER, payload: {filter: 'test filter', page: 1}};

  expect(setFilter('test filter')).toEqual(expected);
});
