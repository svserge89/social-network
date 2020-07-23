import {AuthAction} from '../types';
import {
  setCaptcha,
  setCurrentUser,
  setFetching,
  setUpdating,
} from '../action-creators';
import {
  CAPTCHA_URL,
  EMAIL,
  LOGIN,
  SET_CAPTCHA_ACTION,
  SET_CURRENT_USER_ACTION,
  SET_FETCHING_FALSE_ACTION,
  SET_FETCHING_TRUE_ACTION,
  SET_UPDATING_FALSE_ACTION,
  SET_UPDATING_TRUE_ACTION,
  USER_ID,
} from '../__fixtures__/data';

describe('auth action creators', () => {
  it('should create an action to set current user', () => {
    expect(setCurrentUser(USER_ID, EMAIL, LOGIN)).toEqual<AuthAction>(
      SET_CURRENT_USER_ACTION
    );
  });

  it('should create an action to set captcha', () => {
    expect(setCaptcha(CAPTCHA_URL)).toEqual<AuthAction>(SET_CAPTCHA_ACTION);
  });

  it('should create an action to set fetching', () => {
    expect(setFetching(true)).toEqual<AuthAction>(SET_FETCHING_TRUE_ACTION);
    expect(setFetching(false)).toEqual<AuthAction>(SET_FETCHING_FALSE_ACTION);
  });

  it('should create an action to set updating', () => {
    expect(setUpdating(true)).toEqual<AuthAction>(SET_UPDATING_TRUE_ACTION);
    expect(setUpdating(false)).toEqual<AuthAction>(SET_UPDATING_FALSE_ACTION);
  });
});
