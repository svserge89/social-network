import {ErrorAction} from '../types';
import {setError} from '../action-creators';
import {
  ERROR_CODE,
  ERROR_MESSAGE,
  SET_ERROR_ACTION,
} from '../__fixtures__/data';

describe('error action creators', () => {
  it('should create an action to set error', () => {
    expect(setError(ERROR_CODE, ERROR_MESSAGE)).toEqual<ErrorAction>(
      SET_ERROR_ACTION
    );
  });
});
