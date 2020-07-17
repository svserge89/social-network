import {SET_ERROR, SetErrorAction} from './types';
import {setError} from './action-creators';

it('should create an action to set error', () => {
  const expected: SetErrorAction = {type: SET_ERROR, payload: {code: 401, description: 'test message'}};

  expect(setError(401, 'test message')).toEqual(expected);
});
