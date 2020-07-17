import {AuthState} from '../types';

export const TEST_INITIAL_STATE: AuthState = {
  userId: null,
  email: null,
  login: null,
  fetching: false,
  updating: false,
  captcha: null
};
