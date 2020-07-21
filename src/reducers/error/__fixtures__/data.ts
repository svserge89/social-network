import {ErrorAction, SET_ERROR} from '../types';
import {AxiosError} from 'axios';
import {FORM_ERROR} from 'final-form';

export const INITIAL_STATE = {code: 0, description: null};

export const ERROR_MESSAGE = 'test error message';
export const ERROR_CODE = 500;
export const ERROR_STATUS_CODE = 400;

export const ERROR_RESPONSE = {response: {status: ERROR_CODE, data: {message: ERROR_MESSAGE}}} as AxiosError;

export const FORM_ERROR_EXCEPTION = {[FORM_ERROR]: ERROR_MESSAGE, submissionError: true};

export const SET_ERROR_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: ERROR_CODE, description: ERROR_MESSAGE}
};
export const SET_ERROR_STATUS_ACTION: ErrorAction = {
  type: SET_ERROR,
  payload: {code: ERROR_STATUS_CODE, description: ERROR_MESSAGE}
};
