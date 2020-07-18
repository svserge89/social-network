import {ErrorAction, SET_ERROR} from '../types';

export const TEST_SET_ERROR_ACTION: ErrorAction = {type: SET_ERROR, payload: {code: 500, description: 'test message'}};
export const TEST_SET_SERVER_ERROR_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: 400, description: 'test message'}
};
