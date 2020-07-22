import {AuthAction, AuthState} from '../types';
import authReducer from '../reducer';
import {
  EMPTY_ACTION,
  INITIAL_STATE,
  SET_CAPTCHA_ACTION,
  SET_CURRENT_USER_ACTION,
  SET_CURRENT_USER_EMPTY_ACTION,
  SET_FETCHING_FALSE_ACTION,
  SET_FETCHING_TRUE_ACTION,
  SET_UPDATING_FALSE_ACTION,
  SET_UPDATING_TRUE_ACTION,
  STATE_WITH_CAPTCHA,
  STATE_WITH_CURRENT_USER,
  STATE_WITH_FETCHING_TRUE,
  STATE_WITH_UPDATING_TRUE
} from '../__fixtures__/data';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    const initialState = {...INITIAL_STATE};

    expect(authReducer(undefined, EMPTY_ACTION)).toEqual(INITIAL_STATE);
    expect(authReducer(initialState, EMPTY_ACTION)).toBe(initialState);
  });

  it('should handle SET_FETCHING', () => {
    testReducer(STATE_WITH_FETCHING_TRUE, SET_FETCHING_TRUE_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_FETCHING_FALSE_ACTION, {...STATE_WITH_FETCHING_TRUE});
  });

  it('should handle SET_CURRENT_USER', () => {
    testReducer(STATE_WITH_CURRENT_USER, SET_CURRENT_USER_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_CURRENT_USER_EMPTY_ACTION, {...STATE_WITH_CURRENT_USER});
  });

  it('should handle SET_CAPTCHA', () => {
    testReducer(STATE_WITH_CAPTCHA, SET_CAPTCHA_ACTION, {...INITIAL_STATE});
  });

  it('should handle SET_UPDATING', () => {
    testReducer(STATE_WITH_UPDATING_TRUE, SET_UPDATING_TRUE_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_UPDATING_FALSE_ACTION, {...STATE_WITH_UPDATING_TRUE});
  });
});

function testReducer(expected: AuthState, action: AuthAction, initialState: AuthState): void {
  const result = authReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
