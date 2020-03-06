import {getCurrentUser} from '../auth/thunks';
import {setInitialized} from './actionCreators';
import {InitAsyncThunkAction} from './types';

export const initialization = (): InitAsyncThunkAction => async (dispatch) => {
  await dispatch(getCurrentUser());
  dispatch(setInitialized(true));
};