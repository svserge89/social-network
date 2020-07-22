import {ErrorAction, ErrorState} from '../types';
import errorReducer from '../reducer';
import {EMPTY_ACTION, INITIAL_STATE, SET_ERROR_ACTION, STATE_WITH_ERROR} from '../__fixtures__/data';

describe('error reducer', () => {
  it('should return the initial state', () => {
    const initialState = {...INITIAL_STATE};

    expect(errorReducer(undefined, EMPTY_ACTION)).toEqual(INITIAL_STATE);
    expect(errorReducer(initialState, EMPTY_ACTION)).toBe(initialState);
  });

  it('should handle SET_ERROR', () => {
    testReducer(STATE_WITH_ERROR, SET_ERROR_ACTION, {...INITIAL_STATE});
  });
});

function testReducer(expected: ErrorState, action: ErrorAction, initialState: ErrorState): void {
  const result = errorReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
