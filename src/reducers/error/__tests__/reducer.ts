import {ErrorAction, ErrorState} from '../types';
import errorReducer from '../reducer';
import {ERROR_CODE, ERROR_MESSAGE, INITIAL_STATE, SET_ERROR_ACTION} from '../__fixtures__/data';

describe('error reducer', () => {
  let initialState: ErrorState;

  beforeEach(() => {
    initialState = {...INITIAL_STATE};
  });

  it('should return the initial state', () => {
    expect(errorReducer(undefined, {} as ErrorAction)).toEqual(initialState);
    expect(errorReducer(initialState, {} as ErrorAction)).toBe(initialState);
  });

  it('should handle SET_ERROR', () => {
    testReducer(
      {...initialState, code: ERROR_CODE, description: ERROR_MESSAGE},
      SET_ERROR_ACTION,
      initialState
    );
  });
});

function testReducer(expected: ErrorState, action: ErrorAction, initialState: ErrorState): void {
  const result = errorReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
