import {getCurrentUser} from '../auth/thunks';
import {setInitialized} from './action-creators';
import {InitAsyncThunkAction} from './types';

export const initialization = (): InitAsyncThunkAction => async (dispatch) => {
  await dispatch(getCurrentUser());
  dispatch(setInitialized(true));
};
