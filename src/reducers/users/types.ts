import {ThunkAction} from 'redux-thunk';

import {User} from '../../models/types';
import {RootState} from '../../store/types';

const PREFIX = 'social-network/users/';

export const SET_USERS = PREFIX + 'SET-USERS';
export const SET_PAGE = PREFIX + 'SET-PAGE';
export const SET_SIZE = PREFIX + 'SET-SIZE';
export const SET_FETCHING = PREFIX + 'SET-FETCHING';
export const SET_FOLLOWING = PREFIX + 'SET-FOLLOWING';
export const FOLLOW = PREFIX + 'FOLLOW';
export const UNFOLLOW = PREFIX + 'UNFOLLOW';

export type SetFollowAction = {
  type: typeof FOLLOW
  payload: { userId: number }
}

export type SetUnfollowAction = {
  type: typeof UNFOLLOW
  payload: { userId: number }
}

export type SetUsersAction = {
  type: typeof SET_USERS
  payload: { users: User[], total: number }
}

export type SetPageAction = {
  type: typeof SET_PAGE
  payload: { page: number }
}

export type SetSizeAction = {
  type: typeof SET_SIZE
  payload: { size: number, page: number }
}

export type SetFetchingAction = {
  type: typeof SET_FETCHING
  payload: { fetching: boolean }
}

export type SetFollowingAction = {
  type: typeof SET_FOLLOWING
  payload: { status: boolean, userId: number }
}

export type UsersAction = SetFollowAction
  | SetUnfollowAction
  | SetUsersAction
  | SetPageAction
  | SetSizeAction
  | SetFetchingAction
  | SetFollowingAction

export type UsersThunkAction = ThunkAction<void, RootState, unknown, UsersAction>

export type UsersAsyncThunkAction = ThunkAction<Promise<void>, RootState, unknown, UsersAction>

export type UsersState = {
  users: User[]
  size: number
  total: number
  page: number
  fetching: boolean
  following: number[]
  available: number[]
}
