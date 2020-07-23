import {InitAction, InitState, SET_INITIALIZED} from './types';

const changeInitialized = (
  state: InitState,
  {payload: {initialized}}: InitAction
): InitState => ({
  ...state,
  initialized,
});

const initialState: InitState = {initialized: false};

const initReducer = (state = initialState, action: InitAction): InitState => {
  if (action.type === SET_INITIALIZED) {
    return changeInitialized(state, action);
  } else {
    return state;
  }
};

export default initReducer;
