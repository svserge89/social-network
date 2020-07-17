import {InitAction, InitState, SET_INITIALIZED} from './types';
import initReducer from './reducer';

describe('init reducer', () => {
  let initialState: InitState;

  beforeEach(() => {
    initialState = {initialized: false};
  });

  it('should return the initial state', () => {
    expect(initReducer(undefined, {} as InitAction)).toEqual(initialState);
    expect(initReducer(initialState, {} as InitAction)).toBe(initialState);
  });

  it('should handle SET_INITIALIZED', () => {
    testReducer(
      {...initialState, initialized: true},
      {type: SET_INITIALIZED, payload: {initialized: true}},
      initialState
    );
    testReducer(
      {...initialState, initialized: false},
      {type: SET_INITIALIZED, payload: {initialized: false}},
      {...initialState, initialized: true}
    );
  });
});

function testReducer(expected: InitState, action: InitAction, initialState: InitState): void {
  const result = initReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
