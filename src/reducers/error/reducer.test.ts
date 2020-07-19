import {ErrorAction, ErrorState} from './types';
import errorReducer from './reducer';
import {TEST_ERROR_CODE, TEST_ERROR_MESSAGE, TEST_INITIAL_STATE, TEST_SET_ERROR_ACTION} from './__testing__/test-data';

describe('error reducer', () => {
  let initialState: ErrorState;

  beforeEach(() => {
    initialState = {...TEST_INITIAL_STATE};
  });

  it('should return the initial state', () => {
    expect(errorReducer(undefined, {} as ErrorAction)).toEqual(initialState);
    expect(errorReducer(initialState, {} as ErrorAction)).toBe(initialState);
  });

  it('should handle SET_ERROR', () => {
    testReducer(
      {...initialState, code: TEST_ERROR_CODE, description: TEST_ERROR_MESSAGE},
      TEST_SET_ERROR_ACTION,
      initialState
    );
  });
});

function testReducer(expected: ErrorState, action: ErrorAction, initialState: ErrorState): void {
  const result = errorReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
