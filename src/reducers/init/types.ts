import {ThunkAction} from 'redux-thunk';

import {RootState} from '../../store/types';

export const SET_INITIALIZED = 'social-network/init/SET-INITIALIZED';

export type SetInitializedAction = {
  type: typeof SET_INITIALIZED
  payload: { initialized: boolean }
}

export type InitAction = SetInitializedAction

export type InitAsyncThunkAction = ThunkAction<Promise<void>, RootState, unknown, InitAction>

export type InitState = {
  initialized: boolean
}
