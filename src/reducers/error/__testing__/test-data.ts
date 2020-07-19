import {ErrorAction, SET_ERROR} from '../types';

export const TEST_INITIAL_STATE = {code: 0, description: null};

export const TEST_ERROR_MESSAGE = 'test error message';
export const TEST_ERROR_CODE = 500;
export const TEST_ERROR_STATUS_CODE = 400;

export const TEST_SET_ERROR_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: TEST_ERROR_CODE, description: TEST_ERROR_MESSAGE}
};
export const TEST_SET_ERROR_STATUS_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: TEST_ERROR_STATUS_CODE, description: TEST_ERROR_MESSAGE}
};
