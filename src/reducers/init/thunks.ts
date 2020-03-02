import {getCurrentUser} from '../auth/thunks';
import {setInitialized} from './actionCreators';

export const initialization = () => async (dispatch: any) => {
  await dispatch(getCurrentUser());
  dispatch(setInitialized(true));
};