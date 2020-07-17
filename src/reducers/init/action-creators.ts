import {SET_INITIALIZED, SetInitializedAction} from './types';

export const setInitialized = (initialized: boolean): SetInitializedAction => ({
  type: SET_INITIALIZED,
  payload: {initialized}
});
