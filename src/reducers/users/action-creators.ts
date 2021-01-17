import {User} from '../../models/types';
import {
  FOLLOW,
  SET_FETCHING,
  SET_FOLLOWING,
  SET_USERS,
  SetFetchingAction,
  SetFollowAction,
  SetFollowingAction,
  SetUnfollowAction,
  SetUsersAction,
  UNFOLLOW,
} from './types';

export const setFollow = (userId: number): SetFollowAction => ({
  type: FOLLOW,
  payload: {userId},
});

export const setUnfollow = (userId: number): SetUnfollowAction => ({
  type: UNFOLLOW,
  payload: {userId},
});

export const setUsers = (
  users: Array<User>,
  total: number
): SetUsersAction => ({
  type: SET_USERS,
  payload: {users, total},
});

export const setFetching = (fetching: boolean): SetFetchingAction => ({
  type: SET_FETCHING,
  payload: {fetching},
});

export const setFollowing = (
  status: boolean,
  userId: number
): SetFollowingAction => ({
  type: SET_FOLLOWING,
  payload: {status, userId},
});
