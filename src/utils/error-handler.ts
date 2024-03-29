import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

import {setError} from '../reducers/error/action-creators';
import {ErrorAction} from '../reducers/error/types';

const ERROR_CODE = 400;

export const handleError = (
  dispatch: Dispatch<ErrorAction>,
  error: unknown
) => {
  const {response} = error as AxiosError;

  if (response) {
    dispatch(setError(response.status, response.data.message));
  } else {
    dispatch(setError(ERROR_CODE, 'Network Error'));
  }
};

export const handleServerError = (
  dispatch: Dispatch<ErrorAction>,
  messages: string[]
) => {
  const message = messages?.length ? messages.join('; ') : 'Unknown Error';

  dispatch(setError(ERROR_CODE, message));
};
