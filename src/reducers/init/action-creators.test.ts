import {InitAction} from './types';
import {setInitialized} from './action-creators';
import {TEST_SET_INITIALIZED_FALSE_ACTION, TEST_SET_INITIALIZED_TRUE_ACTION} from './__testing__/test-data';

describe('init action creators', () => {
  it('should create an action to set initialized', () => {
    expect(setInitialized(true)).toEqual<InitAction>(TEST_SET_INITIALIZED_TRUE_ACTION);
    expect(setInitialized(false)).toEqual<InitAction>(TEST_SET_INITIALIZED_FALSE_ACTION);
  });
});
