import {setError} from '../reducers/error';

const ERROR_CODE = 400;

export const handleError = (dispatch, error) => {
  if (error.response) dispatch(setError(error.response.status, error.response.data.message));
  else dispatch(setError(ERROR_CODE, 'Network Error'));
};

export const handleServerError = (dispatch, messages) => {
  const message = (messages && messages.length) ? messages.join('; ') : 'Unknown Error';
  dispatch(setError(ERROR_CODE, message));
};