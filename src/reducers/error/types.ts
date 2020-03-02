const PREFIX = 'social-network/error/';

export const SET_ERROR = PREFIX + 'SET-ERROR';

export type SetErrorAction = {
  type: typeof SET_ERROR
  data: { code: number | null, description: string | null }
}

export type ErrorState = { code: number, description: string | null }