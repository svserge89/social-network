import {ErrorAction, SET_ERROR} from './types';
import {setError} from './action-creators';

describe('error action creators', () => {
  it('should create an action to set error', () => {
    expect(setError(401, 'test message'))
      .toEqual<ErrorAction>({type: SET_ERROR, payload: {code: 401, description: 'test message'}});
  });
});
