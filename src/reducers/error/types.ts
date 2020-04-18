const PREFIX = 'social-network/error/';

export const SET_ERROR = PREFIX + 'SET-ERROR';

export type SetErrorAction = {
  type: typeof SET_ERROR
  payload: { code: number, description: string | null }
}

export type ErrorAction = SetErrorAction

export type ErrorState = { code: number, description: string | null }
