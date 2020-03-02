import {InitStateAction, SET_INITIALIZED} from './types';

const changeInitialized = (state: InitStateAction, initialized: boolean): InitStateAction => ({
  ...state,
  initialized
});

const initialState: InitStateAction = {initialized: false};

const initReducer = (state = initialState, action: any): InitStateAction => {
  if (action.type === SET_INITIALIZED) return changeInitialized(state, action.initialized);
  else return state;
};

export default initReducer;