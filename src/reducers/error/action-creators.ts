import {SET_ERROR, SetErrorAction} from './types';

export const setError = (code: number, description: string | null): SetErrorAction => ({
  type: SET_ERROR,
  payload: {code, description}
});
