import {AuthAction, AuthState} from '../types';
import authReducer from '../reducer';
import {
  CAPTCHA_URL,
  EMAIL,
  INITIAL_STATE,
  LOGIN,
  SET_CAPTCHA_ACTION,
  SET_CURRENT_USER_ACTION,
  SET_CURRENT_USER_EMPTY_ACTION,
  SET_FETCHING_FALSE_ACTION,
  SET_FETCHING_TRUE_ACTION,
  SET_UPDATING_FALSE_ACTION,
  SET_UPDATING_TRUE_ACTION,
  USER_ID
} from '../__fixtures__/data';

describe('auth reducer', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {...INITIAL_STATE};
  });

  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as AuthAction)).toEqual(initialState);
    expect(authReducer(initialState, {} as AuthAction)).toBe(initialState);
  });

  it('should handle SET_FETCHING', () => {
    testReducer({...initialState, fetching: true}, SET_FETCHING_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, fetching: false},
      SET_FETCHING_FALSE_ACTION,
      {...initialState, fetching: true}
    );
  });

  it('should handle SET_CURRENT_USER', () => {
    testReducer(
      {...initialState, userId: USER_ID, email: EMAIL, login: LOGIN},
      SET_CURRENT_USER_ACTION,
      initialState
    );
    testReducer(
      {...initialState},
      SET_CURRENT_USER_EMPTY_ACTION,
      {...initialState, userId: USER_ID, email: EMAIL, login: LOGIN}
    );
  });

  it('should handle SET_CAPTCHA', () => {
    testReducer({...initialState, captcha: CAPTCHA_URL}, SET_CAPTCHA_ACTION, initialState);
  });

  it('should handle SET_UPDATING', () => {
    testReducer({...initialState, updating: true}, SET_UPDATING_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, updating: false},
      SET_UPDATING_FALSE_ACTION,
      {...initialState, updating: true}
    );
  });
});

function testReducer(expected: AuthState, action: AuthAction, initialState: AuthState): void {
  const result = authReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
