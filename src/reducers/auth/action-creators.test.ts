import {AuthAction, SET_CAPTCHA, SET_CURRENT_USER, SET_FETCHING, SET_UPDATING} from './types';
import {setCaptcha, setCurrentUser, setFetching, setUpdating} from './action-creators';

describe('auth action creators', () => {
  it('should create an action to set current user', () => {
    expect(setCurrentUser(42, 'test@email.com', 'test'))
      .toEqual<AuthAction>({
        type: SET_CURRENT_USER,
        payload: {email: 'test@email.com', login: 'test', userId: 42}
      });
  });

  it('should create an action to set captcha', () => {
    expect(setCaptcha('some_url'))
      .toEqual<AuthAction>({type: SET_CAPTCHA, payload: {captcha: 'some_url'}});
  });

  it('should create an action to set fetching', () => {
    expect(setFetching(true)).toEqual<AuthAction>({type: SET_FETCHING, payload: {fetching: true}});
    expect(setFetching(false)).toEqual<AuthAction>({type: SET_FETCHING, payload: {fetching: false}});
  });

  it('should create an action to set updating', () => {
    expect(setUpdating(true)).toEqual<AuthAction>({type: SET_UPDATING, payload: {updating: true}});
    expect(setUpdating(false)).toEqual<AuthAction>({type: SET_UPDATING, payload: {updating: false}});
  });
});
