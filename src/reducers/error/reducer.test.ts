import {ErrorAction, ErrorState, SET_ERROR} from './types';
import errorReducer from './reducer';

describe('error reducer', () => {
  let initialState: ErrorState;

  beforeEach(() => {
    initialState = {code: 0, description: null};
  });

  it('should return the initial state', () => {
    expect(errorReducer(undefined, {} as ErrorAction)).toEqual(initialState);
    expect(errorReducer(initialState, {} as ErrorAction)).toBe(initialState);
  });

  it('should handle SET_ERROR', () => {
    testReducer(
      {...initialState, code: 401, description: 'test message'},
      {type: SET_ERROR, payload: {code: 401, description: 'test message'}},
      initialState
    );
  });
});

function testReducer(expected: ErrorState, action: ErrorAction, initialState: ErrorState): void {
  const result = errorReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
