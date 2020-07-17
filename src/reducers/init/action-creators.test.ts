import {InitAction, SET_INITIALIZED} from './types';
import {setInitialized} from './action-creators';

describe('init action creators', () => {
  it('should create an action to set initialized', () => {
    expect(setInitialized(true))
      .toEqual<InitAction>({type: SET_INITIALIZED, payload: {initialized: true}});
    expect(setInitialized(false))
      .toEqual<InitAction>({type: SET_INITIALIZED, payload: {initialized: false}});
  });
});
