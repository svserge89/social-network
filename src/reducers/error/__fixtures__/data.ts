import {AxiosError} from 'axios';
import {FORM_ERROR} from 'final-form';

import {ErrorAction, ErrorState, SET_ERROR} from '../types';

export const ERROR_MESSAGE = 'test error message';
export const ERROR_CODE = 500;
export const ERROR_STATUS_CODE = 400;

export const INITIAL_STATE: ErrorState = {code: 0, description: null};
export const STATE_WITH_ERROR: ErrorState = {
  ...INITIAL_STATE,
  code: ERROR_CODE,
  description: ERROR_MESSAGE,
};

export const ERROR_RESPONSE = {
  response: {status: ERROR_CODE, data: {message: ERROR_MESSAGE}},
} as AxiosError;

export const FORM_ERROR_EXCEPTION = {
  [FORM_ERROR]: ERROR_MESSAGE,
  submissionError: true,
};

export const EMPTY_ACTION = {} as ErrorAction;
export const SET_ERROR_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: ERROR_CODE, description: ERROR_MESSAGE},
};
export const SET_ERROR_STATUS_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: ERROR_STATUS_CODE, description: ERROR_MESSAGE},
};
