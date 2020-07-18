import {AuthAction, AuthState} from './types';
import authReducer from './reducer';
import {
  TEST_CAPTCHA_URL,
  TEST_EMAIL,
  TEST_INITIAL_STATE,
  TEST_LOGIN,
  TEST_SET_CAPTCHA_ACTION,
  TEST_SET_CURRENT_USER_ACTION,
  TEST_SET_CURRENT_USER_EMPTY_ACTION,
  TEST_SET_FETCHING_FALSE_ACTION,
  TEST_SET_FETCHING_TRUE_ACTION,
  TEST_SET_UPDATING_FALSE_ACTION,
  TEST_SET_UPDATING_TRUE_ACTION,
  TEST_USER_ID
} from './__testing__/test-data';

describe('auth reducer', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {...TEST_INITIAL_STATE};
  });

  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as AuthAction)).toEqual(initialState);
    expect(authReducer(initialState, {} as AuthAction)).toBe(initialState);
  });

  it('should handle SET_FETCHING', () => {
    testReducer({...initialState, fetching: true}, TEST_SET_FETCHING_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, fetching: false},
      TEST_SET_FETCHING_FALSE_ACTION,
      {...initialState, fetching: true}
    );
  });

  it('should handle SET_CURRENT_USER', () => {
    testReducer(
      {...initialState, userId: TEST_USER_ID, email: TEST_EMAIL, login: TEST_LOGIN},
      TEST_SET_CURRENT_USER_ACTION,
      initialState
    );
    testReducer(
      {...initialState},
      TEST_SET_CURRENT_USER_EMPTY_ACTION,
      {...initialState, userId: TEST_USER_ID, email: TEST_EMAIL, login: TEST_LOGIN}
    );
  });

  it('should handle SET_CAPTCHA', () => {
    testReducer({...initialState, captcha: TEST_CAPTCHA_URL}, TEST_SET_CAPTCHA_ACTION, initialState);
  });

  it('should handle SET_UPDATING', () => {
    testReducer({...initialState, updating: true}, TEST_SET_UPDATING_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, updating: false},
      TEST_SET_UPDATING_FALSE_ACTION,
      {...initialState, updating: true}
    );
  });
});

function testReducer(expected: AuthState, action: AuthAction, initialState: AuthState): void {
  const result = authReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
