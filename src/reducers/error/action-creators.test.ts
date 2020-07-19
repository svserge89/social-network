import {ErrorAction} from './types';
import {setError} from './action-creators';
import {TEST_ERROR_CODE, TEST_ERROR_MESSAGE, TEST_SET_ERROR_ACTION} from './__testing__/test-data';

describe('error action creators', () => {
  it('should create an action to set error', () => {
    expect(setError(TEST_ERROR_CODE, TEST_ERROR_MESSAGE)).toEqual<ErrorAction>(TEST_SET_ERROR_ACTION);
  });
});
