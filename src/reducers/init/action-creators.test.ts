import {SET_INITIALIZED, SetInitializedAction} from './types';
import {setInitialized} from './action-creators';

it('should create an action to set initialized', () => {
  const expectedTrue: SetInitializedAction = {type: SET_INITIALIZED, payload: {initialized: true}};
  const expectedFalse: SetInitializedAction = {type: SET_INITIALIZED, payload: {initialized: false}};

  expect(setInitialized(true)).toEqual(expectedTrue);
  expect(setInitialized(false)).toEqual(expectedFalse);
});
