import {ErrorAction, SET_ERROR} from '../types';

export const INITIAL_STATE = {code: 0, description: null};

export const ERROR_MESSAGE = 'test error message';
export const ERROR_CODE = 500;
export const ERROR_STATUS_CODE = 400;

export const SET_ERROR_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: ERROR_CODE, description: ERROR_MESSAGE}
};
export const SET_ERROR_STATUS_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: ERROR_STATUS_CODE, description: ERROR_MESSAGE}
};
