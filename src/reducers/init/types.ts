const PREFIX = 'social-network/init/';

export const SET_INITIALIZED = PREFIX + 'SET-INITIALIZED';

export type SetInitializedAction = {
  type: typeof SET_INITIALIZED
  initialized: boolean
}

export type InitStateAction = {
  initialized: boolean
}