import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

import {setError} from '../reducers/error/actionCreators';
import {ErrorAction} from '../reducers/error/types';

const ERROR_CODE = 400;

export const handleError = (dispatch: Dispatch<ErrorAction>, {response}: AxiosError) => {
  if (response) dispatch(setError(response.status, response.data.message));
  else dispatch(setError(ERROR_CODE, 'Network Error'));
};

export const handleServerError = (dispatch: Dispatch<ErrorAction>, messages: string[]) => {
  const message = (messages && messages.length) ? messages.join('; ') : 'Unknown Error';

  dispatch(setError(ERROR_CODE, message));
};