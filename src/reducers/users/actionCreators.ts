import {User} from '../../models/types';
import {
  FOLLOW,
  SET_FETCHING,
  SET_FOLLOWING,
  SET_PAGE,
  SET_SIZE,
  SET_USERS,
  SetFetchingAction,
  SetFollowAction,
  SetFollowingAction,
  SetPageAction,
  SetSizeAction,
  SetUnfollowAction,
  SetUsersAction,
  UNFOLLOW
} from './types';

export const setFollow = (userId: number): SetFollowAction => ({type: FOLLOW, data: {userId}});

export const setUnfollow = (userId: number): SetUnfollowAction => ({
  type: UNFOLLOW,
  data: {userId}
});

export const setUsers = (users: Array<User>, total: number): SetUsersAction => ({
  type: SET_USERS,
  data: {users, total}
});

export const setPage = (page: number): SetPageAction => ({type: SET_PAGE, data: {page}});

export const setSize = (size: number): SetSizeAction => ({type: SET_SIZE, data: {size, page: 1}});

export const setFetching = (fetching: boolean): SetFetchingAction => ({
  type: SET_FETCHING,
  data: {fetching}
});

export const setFollowing = (status: boolean, userId: number): SetFollowingAction => ({
  type: SET_FOLLOWING,
  data: {status, userId}
});