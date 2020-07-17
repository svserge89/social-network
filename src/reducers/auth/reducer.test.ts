import {AuthAction, AuthState, SET_CAPTCHA, SET_CURRENT_USER, SET_FETCHING, SET_UPDATING} from './types';
import authReducer from './reducer';
import {MOCK_INITIAL_STATE} from './__mocks__/mock-data';

describe('auth reducer', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {...MOCK_INITIAL_STATE};
  });

  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as AuthAction)).toEqual(initialState);
    expect(authReducer(initialState, {} as AuthAction)).toBe(initialState);
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

  it('should handle SET_CURRENT_USER', () => {
    testReducer(
      {...initialState, userId: 42, email: 'test@email.com', login: 'test user'},
      {type: SET_CURRENT_USER, payload: {userId: 42, email: 'test@email.com', login: 'test user'}},
      initialState
    );
    testReducer(
      {...initialState},
      {type: SET_CURRENT_USER, payload: {userId: null, email: null, login: null}},
      {...initialState, userId: 42, email: 'test@email.com', login: 'test user'}
    );
  });

  it('should handle SET_CAPTCHA', () => {
    testReducer(
      {...initialState, captcha: 'captcha/url'},
      {type: SET_CAPTCHA, payload: {captcha: 'captcha/url'}},
      initialState
    );
  });

  it('should handle SET_UPDATING', () => {
    testReducer(
      {...initialState, updating: true},
      {type: SET_UPDATING, payload: {updating: true}},
      initialState
    );
    testReducer(
      {...initialState, updating: false},
      {type: SET_UPDATING, payload: {updating: false}},
      {...initialState, updating: true}
    );
  });
});

function testReducer(expected: AuthState, action: AuthAction, initialState: AuthState): void {
  const result = authReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
