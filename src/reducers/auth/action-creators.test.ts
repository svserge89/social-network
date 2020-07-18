import {AuthAction} from './types';
import {setCaptcha, setCurrentUser, setFetching, setUpdating} from './action-creators';
import {
  TEST_CAPTCHA_URL,
  TEST_EMAIL,
  TEST_LOGIN,
  TEST_SET_CAPTCHA_ACTION,
  TEST_SET_CURRENT_USER_ACTION,
  TEST_SET_FETCHING_FALSE_ACTION,
  TEST_SET_FETCHING_TRUE_ACTION,
  TEST_SET_UPDATING_FALSE_ACTION,
  TEST_SET_UPDATING_TRUE_ACTION,
  TEST_USER_ID
} from './__testing__/test-data';

describe('auth action creators', () => {
  it('should create an action to set current user', () => {
    expect(setCurrentUser(TEST_USER_ID, TEST_EMAIL, TEST_LOGIN)).toEqual<AuthAction>(TEST_SET_CURRENT_USER_ACTION);
  });

  it('should create an action to set captcha', () => {
    expect(setCaptcha(TEST_CAPTCHA_URL)).toEqual<AuthAction>(TEST_SET_CAPTCHA_ACTION);
  });

  it('should create an action to set fetching', () => {
    expect(setFetching(true)).toEqual<AuthAction>(TEST_SET_FETCHING_TRUE_ACTION);
    expect(setFetching(false)).toEqual<AuthAction>(TEST_SET_FETCHING_FALSE_ACTION);
  });

  it('should create an action to set updating', () => {
    expect(setUpdating(true)).toEqual<AuthAction>(TEST_SET_UPDATING_TRUE_ACTION);
    expect(setUpdating(false)).toEqual<AuthAction>(TEST_SET_UPDATING_FALSE_ACTION);
  });
});
