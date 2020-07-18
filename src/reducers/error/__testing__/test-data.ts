import {ErrorAction, SET_ERROR} from '../types';

export const TEST_ERROR_MESSAGE = 'test error message';

export const TEST_SET_ERROR_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: 500, description: TEST_ERROR_MESSAGE}
};
export const TEST_SET_SERVER_ERROR_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: 400, description: TEST_ERROR_MESSAGE}
};
