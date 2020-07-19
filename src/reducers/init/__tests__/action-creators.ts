import {InitAction} from '../types';
import {setInitialized} from '../action-creators';
import {SET_INITIALIZED_FALSE_ACTION, SET_INITIALIZED_TRUE_ACTION} from '../__fixtures__/data';

describe('init action creators', () => {
  it('should create an action to set initialized', () => {
    expect(setInitialized(true)).toEqual<InitAction>(SET_INITIALIZED_TRUE_ACTION);
    expect(setInitialized(false)).toEqual<InitAction>(SET_INITIALIZED_FALSE_ACTION);
  });
});
