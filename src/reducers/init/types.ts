const PREFIX = 'social-network/init/';

export const SET_INITIALIZED = PREFIX + 'SET-INITIALIZED';

export type SetInitializedAction = {
  type: typeof SET_INITIALIZED
  data: { initialized: boolean }
}

export type InitAction = SetInitializedAction;

export type InitState = {
  initialized: boolean
}