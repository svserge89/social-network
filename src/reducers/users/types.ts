import {ThunkAction} from 'redux-thunk';

import {User} from '../../models/types';
import {RootState} from '../../store/types';

export enum Relation {
  ALL,
  FRIENDS,
  NOT_FRIENDS
}

export const SET_USERS = 'social-network/users/SET-USERS';
export const SET_PAGE = 'social-network/users/SET-PAGE';
export const SET_SIZE = 'social-network/users/SET-SIZE';
export const SET_FETCHING = 'social-network/users/SET-FETCHING';
export const SET_FOLLOWING = 'social-network/users/SET-FOLLOWING';
export const SET_FILTER = 'social-network/users/SET-FILTER';
export const SET_RELATION = 'social-network/users/SET-RELATION';
export const FOLLOW = 'social-network/users/FOLLOW';
export const UNFOLLOW = 'social-network/users/UNFOLLOW';

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
  payload: { size: number, page: 1 }
}

export type SetFetchingAction = {
  type: typeof SET_FETCHING
  payload: { fetching: boolean }
}

export type SetFollowingAction = {
  type: typeof SET_FOLLOWING
  payload: { status: boolean, userId: number }
}

export type SetRelationAction = {
  type: typeof SET_RELATION
  payload: { relation: Relation, page: 1 }
}

export type SetFilterAction = {
  type: typeof SET_FILTER
  payload: { filter: string, page: 1 }
}

export type UsersAction = SetFollowAction
  | SetUnfollowAction
  | SetUsersAction
  | SetPageAction
  | SetSizeAction
  | SetFetchingAction
  | SetFollowingAction
  | SetRelationAction
  | SetFilterAction

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
  relation: Relation
  filter: string
}
