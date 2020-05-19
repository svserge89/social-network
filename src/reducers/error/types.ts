export const SET_ERROR = 'social-network/error/SET-ERROR';

export type SetErrorAction = {
  type: typeof SET_ERROR
  payload: { code: number, description: string | null }
}

export type ErrorAction = SetErrorAction

export type ErrorState = { code: number, description: string | null }
