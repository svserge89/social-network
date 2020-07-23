import {UsersAction, UsersState} from '../types';
import usersReducer from '../reducer';
import {
  EMPTY_ACTION,
  INITIAL_STATE,
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
  STATE_WITH_FETCHING_TRUE,
  STATE_WITH_FILTER,
  STATE_WITH_FOLLOWING,
  STATE_WITH_FOLLOWING_USER_ID,
  STATE_WITH_PAGE,
  STATE_WITH_RELATION_FRIENDS,
  STATE_WITH_SIZE,
  STATE_WITH_USERS,
  STATE_WITH_USERS_AND_TOTAL,
  STATE_WITH_USERS_FOLLOWED,
} from '../__fixtures__/data';

describe('users reducer', () => {
  it('should return the initial state', () => {
    const initialState = {...INITIAL_STATE};

    expect(usersReducer(undefined, EMPTY_ACTION)).toEqual(INITIAL_STATE);
    expect(usersReducer(initialState, EMPTY_ACTION)).toBe(initialState);
  });

  it('should handle FOLLOW', () => {
    testReducer(STATE_WITH_USERS_FOLLOWED, SET_FOLLOW_ACTION, {
      ...STATE_WITH_USERS,
    });
  });

  it('should handle UNFOLLOW', () => {
    testReducer(STATE_WITH_USERS, SET_UNFOLLOW_ACTION, {
      ...STATE_WITH_USERS_FOLLOWED,
    });
  });

  it('should handle SET_USERS', () => {
    testReducer(STATE_WITH_USERS_AND_TOTAL, SET_USERS_ACTION, {
      ...INITIAL_STATE,
    });
  });

  it('should handle SET_PAGE', () => {
    testReducer(STATE_WITH_PAGE, SET_PAGE_ACTION, {...INITIAL_STATE});
  });

  it('should handle SET_SIZE', () => {
    testReducer(STATE_WITH_SIZE, SET_SIZE_ACTION, {...INITIAL_STATE});
  });

  it('should handle SET_FETCHING', () => {
    testReducer(STATE_WITH_FETCHING_TRUE, SET_FETCHING_TRUE_ACTION, {
      ...INITIAL_STATE,
    });
    testReducer(INITIAL_STATE, SET_FETCHING_FALSE_ACTION, {
      ...STATE_WITH_FETCHING_TRUE,
    });
  });

  it('should handle SET_RELATION', () => {
    testReducer(STATE_WITH_RELATION_FRIENDS, SET_RELATION_FRIENDS_ACTION, {
      ...INITIAL_STATE,
    });
  });

  it('should handle SET_FILTER', () => {
    testReducer(STATE_WITH_FILTER, SET_FILTER_ACTION, {...INITIAL_STATE});
  });

  it('should handle SET_FOLLOWING', () => {
    testReducer(STATE_WITH_FOLLOWING_USER_ID, SET_FOLLOWING_TRUE_ACTION, {
      ...STATE_WITH_FOLLOWING,
    });
    testReducer(STATE_WITH_FOLLOWING, SET_FOLLOWING_FALSE_ACTION, {
      ...STATE_WITH_FOLLOWING_USER_ID,
    });
  });
});

function testReducer(
  expected: UsersState,
  action: UsersAction,
  initialState: UsersState
): void {
  const result = usersReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
