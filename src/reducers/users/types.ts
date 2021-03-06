import {ThunkAction} from 'redux-thunk';

import {User} from '../../models/types';
import {RootState} from '../../store/types';

export const SET_USERS = 'social-network/users/SET-USERS';
export const SET_FETCHING = 'social-network/users/SET-FETCHING';
export const SET_FOLLOWING = 'social-network/users/SET-FOLLOWING';
export const FOLLOW = 'social-network/users/FOLLOW';
export const UNFOLLOW = 'social-network/users/UNFOLLOW';

export type SetFollowAction = {
  type: typeof FOLLOW;
  payload: {userId: number};
};

export type SetUnfollowAction = {
  type: typeof UNFOLLOW;
  payload: {userId: number};
};

export type SetUsersAction = {
  type: typeof SET_USERS;
  payload: {users: User[]; total: number};
};

export type SetFetchingAction = {
  type: typeof SET_FETCHING;
  payload: {fetching: boolean};
};

export type SetFollowingAction = {
  type: typeof SET_FOLLOWING;
  payload: {status: boolean; userId: number};
};

export type UsersAction =
  | SetFollowAction
  | SetUnfollowAction
  | SetUsersAction
  | SetFetchingAction
  | SetFollowingAction;

export type UsersThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  UsersAction
>;

export type UsersAsyncThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  UsersAction
>;

export type UsersState = {
  users: User[];
  total: number;
  fetching: boolean;
  following: number[];
  available: number[];
};
