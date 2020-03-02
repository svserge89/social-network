import {setError} from '../reducers/error/actionCreators';

const ERROR_CODE = 400;

export const handleError = (dispatch: any, error: any) => {
  if (error.response) dispatch(setError(error.response.status, error.response.data.message));
  else dispatch(setError(ERROR_CODE, 'Network Error'));
};

export const handleServerError = (dispatch: any, messages: Array<string>) => {
  const message = (messages && messages.length) ? messages.join('; ') : 'Unknown Error';
  dispatch(setError(ERROR_CODE, message));
};