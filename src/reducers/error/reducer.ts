import {ErrorState, SET_ERROR} from './types';

const changeData = (state: ErrorState, data: any): ErrorState => ({...state, ...data});

const initialState: ErrorState = {code: 0, description: null};

const errorReducer = (state = initialState, action: any): ErrorState => {
  if (action.type === SET_ERROR) return changeData(state, action.data);
  else return state;
};

export default errorReducer;