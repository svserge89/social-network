import {Relation, UsersAction} from '../types';
import {
  setFetching,
  setFilter,
  setFollow,
  setFollowing,
  setPage,
  setRelation,
  setSize,
  setUnfollow,
  setUsers,
} from '../action-creators';
import {
  FILTER,
  PAGE,
  SET_FETCHING_FALSE_ACTION,
  SET_FETCHING_TRUE_ACTION,
  SET_FILTER_ACTION,
  SET_FOLLOW_ACTION,
  SET_FOLLOWING_FALSE_ACTION,
  SET_FOLLOWING_TRUE_ACTION,
  SET_PAGE_ACTION,
  SET_RELATION_FRIENDS_ACTION,
  SET_SIZE_ACTION,
  SET_UNFOLLOW_ACTION,
  SET_USERS_ACTION,
  SIZE,
  TOTAL,
  USER_ID,
  USERS,
} from '../__fixtures__/data';

describe('users action creators', () => {
  it('should create an action to set follow user', () => {
    expect(setFollow(USER_ID)).toEqual<UsersAction>(SET_FOLLOW_ACTION);
  });

  it('should create an action to set unfollow user', () => {
    expect(setUnfollow(USER_ID)).toEqual<UsersAction>(SET_UNFOLLOW_ACTION);
  });

  it('should create an action to set users', () => {
    expect(setUsers([...USERS], TOTAL)).toEqual<UsersAction>(SET_USERS_ACTION);
  });

  it('should create an action to set page', () => {
    expect(setPage(PAGE)).toEqual<UsersAction>(SET_PAGE_ACTION);
  });

  it('should create an action to set page size', () => {
    expect(setSize(SIZE)).toEqual<UsersAction>(SET_SIZE_ACTION);
  });

  it('should create an action to set fetching', () => {
    expect(setFetching(true)).toEqual<UsersAction>(SET_FETCHING_TRUE_ACTION);
    expect(setFetching(false)).toEqual<UsersAction>(SET_FETCHING_FALSE_ACTION);
  });

  it('should create an action to set following', () => {
    expect(setFollowing(true, USER_ID)).toEqual<UsersAction>(
      SET_FOLLOWING_TRUE_ACTION
    );
    expect(setFollowing(false, USER_ID)).toEqual<UsersAction>(
      SET_FOLLOWING_FALSE_ACTION
    );
  });

  it('should create an action to set relation', () => {
    expect(setRelation(Relation.FRIENDS)).toEqual<UsersAction>(
      SET_RELATION_FRIENDS_ACTION
    );
  });

  it('should create an action to set filter', () => {
    expect(setFilter(FILTER)).toEqual<UsersAction>(SET_FILTER_ACTION);
  });
});
