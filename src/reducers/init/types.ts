import {ThunkAction} from 'redux-thunk';

import {RootState} from '../../store/types';

const PREFIX = 'social-network/init/';

export const SET_INITIALIZED = PREFIX + 'SET-INITIALIZED';

export type SetInitializedAction = {
  type: typeof SET_INITIALIZED
  data: { initialized: boolean }
}

export type InitAction = SetInitializedAction

export type InitAsyncThunkAction = ThunkAction<Promise<void>, RootState, unknown, InitAction>

export type InitState = {
  initialized: boolean
}