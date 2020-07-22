import {InitAction, InitState} from '../types';
import initReducer from '../reducer';
import {
  EMPTY_ACTION,
  INITIAL_STATE,
  SET_INITIALIZED_FALSE_ACTION,
  SET_INITIALIZED_TRUE_ACTION,
  STATE_WITH_INITIALIZED_TRUE
} from '../__fixtures__/data';

describe('init reducer', () => {
  it('should return the initial state', () => {
    const initialState = {...INITIAL_STATE};

    expect(initReducer(undefined, EMPTY_ACTION)).toEqual(INITIAL_STATE);
    expect(initReducer(initialState, {} as InitAction)).toBe(initialState);
  });

  it('should handle SET_INITIALIZED', () => {
    testReducer(STATE_WITH_INITIALIZED_TRUE, SET_INITIALIZED_TRUE_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_INITIALIZED_FALSE_ACTION, {...STATE_WITH_INITIALIZED_TRUE});
  });
});

function testReducer(expected: InitState, action: InitAction, initialState: InitState): void {
  const result = initReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
