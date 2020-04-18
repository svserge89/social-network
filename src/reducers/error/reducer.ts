import {ErrorAction, ErrorState, SET_ERROR} from './types';

const changeData = (state: ErrorState, {payload}: ErrorAction): ErrorState => ({
  ...state,
  ...payload
});

const initialState: ErrorState = {code: 0, description: null};

const errorReducer = (state = initialState, action: ErrorAction): ErrorState => {
  if (action.type === SET_ERROR) return changeData(state, action);
  else return state;
};

export default errorReducer;
