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
  UsersAction,
  UsersState
} from './types';
import usersReducer from './reducer';
import {MOCK_INITIAL_STATE, MOCK_USERS} from './__mocks__/mock-data';

describe('users reducer', () => {
  let initialState: UsersState;

  beforeEach(() => {
    initialState = {...MOCK_INITIAL_STATE};
  });

  it('should return the initial state', () => {
    expect(usersReducer(undefined, {} as UsersAction)).toEqual(initialState);
    expect(usersReducer(initialState, {} as UsersAction)).toBe(initialState);
  });

  it('should handle FOLLOW', () => {
    const users = [...MOCK_USERS];
    const expectedUsers = MOCK_USERS.map(user => user.id === 2 ? {...user, followed: true} : user);

    testReducer(
      {...initialState, users: expectedUsers},
      {type: FOLLOW, payload: {userId: 2}},
      {...initialState, users}
    );
  });

  it('should handle UNFOLLOW', () => {
    const users = MOCK_USERS.map(user => user.id === 2 ? {...user, followed: true} : user);
    const expectedUsers = [...MOCK_USERS];

    testReducer(
      {...initialState, users: expectedUsers},
      {type: UNFOLLOW, payload: {userId: 2}},
      {...initialState, users}
    );
  });

  it('should handle SET_USERS', () => {
    const users = [...MOCK_USERS];

    testReducer(
      {...initialState, users, total: 42},
      {type: SET_USERS, payload: {users, total: 42}},
      initialState
    );
  });

  it('should handle SET_PAGE', () => {
    testReducer({...initialState, page: 42}, {type: SET_PAGE, payload: {page: 42}}, initialState);
  });

  it('should handle SET_SIZE', () => {
    testReducer(
      {...initialState, size: 42, page: 1},
      {type: SET_SIZE, payload: {page: 1, size: 42}},
      initialState
    );
  });

  it('should handle SET_FETCHING', () => {
    testReducer(
      {...initialState, fetching: true},
      {type: SET_FETCHING, payload: {fetching: true}},
      initialState
    );
    testReducer(
      {...initialState, fetching: false},
      {type: SET_FETCHING, payload: {fetching: false}},
      {...initialState, fetching: true}
    );
  });

  it('should handle SET_RELATION', () => {
    testReducer(
      {...initialState, relation: Relation.FRIENDS, page: 1},
      {type: SET_RELATION, payload: {page: 1, relation: Relation.FRIENDS}},
      initialState
    );
  });

  it('should handle SET_FILTER', () => {
    testReducer(
      {...initialState, filter: 'test filter', page: 1},
      {type: SET_FILTER, payload: {page: 1, filter: 'test filter'}},
      initialState
    );
  });

  it('should handle SET_FOLLOWING', () => {
    testReducer(
      {...initialState, following: [1, 2, 3, 42]},
      {type: SET_FOLLOWING, payload: {userId: 42, status: true}},
      {...initialState, following: [1, 2, 3]}
    );
    testReducer(
      {...initialState, following: [1, 2, 3]},
      {type: SET_FOLLOWING, payload: {userId: 42, status: false}},
      {...initialState, following: [1, 2, 3, 42]}
    );
  });
});

function testReducer(expected: UsersState, action: UsersAction, initialState: UsersState): void {
  const result = usersReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
