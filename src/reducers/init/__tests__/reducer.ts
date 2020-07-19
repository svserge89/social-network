import {InitAction, InitState} from '../types';
import initReducer from '../reducer';
import {
  INITIAL_STATE,
  SET_INITIALIZED_FALSE_ACTION,
  SET_INITIALIZED_TRUE_ACTION
} from '../__fixtures__/data';

describe('init reducer', () => {
  let initialState: InitState;

  beforeEach(() => {
    initialState = {...INITIAL_STATE};
  });

  it('should return the initial state', () => {
    expect(initReducer(undefined, {} as InitAction)).toEqual(initialState);
    expect(initReducer(initialState, {} as InitAction)).toBe(initialState);
  });

  it('should handle SET_INITIALIZED', () => {
    testReducer({...initialState, initialized: true}, SET_INITIALIZED_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, initialized: false},
      SET_INITIALIZED_FALSE_ACTION,
      {...initialState, initialized: true}
    );
  });
});

function testReducer(expected: InitState, action: InitAction, initialState: InitState): void {
  const result = initReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
