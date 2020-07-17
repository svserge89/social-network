import {
  SET_CAPTCHA,
  SET_CURRENT_USER,
  SET_FETCHING,
  SET_UPDATING,
  SetCaptchaAction,
  SetCurrentUserAction,
  SetFetchingAction,
  SetUpdatingAction
} from './types';
import {setCaptcha, setCurrentUser, setFetching, setUpdating} from './action-creators';

it('should create an action to set current user', () => {
  const expected: SetCurrentUserAction = {
    type: SET_CURRENT_USER,
    payload: {email: 'test@email.com', login: 'test', userId: 42}
  };

  expect(setCurrentUser(42, 'test@email.com', 'test')).toEqual(expected);
});

it('should create an action to set captcha', () => {
  const expected: SetCaptchaAction = {type: SET_CAPTCHA, payload: {captcha: 'some_url'}};

  expect(setCaptcha('some_url')).toEqual(expected);
});

it('should create an action to set fetching', () => {
  const expectedTrue: SetFetchingAction = {type: SET_FETCHING, payload: {fetching: true}};
  const expectedFalse: SetFetchingAction = {type: SET_FETCHING, payload: {fetching: false}};

  expect(setFetching(true)).toEqual(expectedTrue);
  expect(setFetching(false)).toEqual(expectedFalse);
});

it('should create an action to set updating', () => {
  const expectedTrue: SetUpdatingAction = {type: SET_UPDATING, payload: {updating: true}};
  const expectedFalse: SetUpdatingAction = {type: SET_UPDATING, payload: {updating: false}};

  expect(setUpdating(true)).toEqual(expectedTrue);
  expect(setUpdating(false)).toEqual(expectedFalse);
});
