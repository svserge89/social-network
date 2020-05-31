import {followAPI, usersAPI} from '../../api/api';
import {handleError, handleServerError} from '../../utils/errorHandler';
import {ResultCode} from '../../utils/responseCodes';
import {setFetching, setFollow, setFollowing, setUnfollow, setUsers} from './actionCreators';
import {UsersAsyncThunkAction, UsersThunkAction, Relation} from './types';

export const getUsers = (page: number,
                         size: number,
                         relation?: Relation,
                         filter?: string): UsersAsyncThunkAction => async (dispatch) => {
  dispatch(setFetching(true));

  try {
    const {items, totalCount, error} = await usersAPI.get(size, page, relation, filter);

    if (error) handleServerError(dispatch, [error]);
    else dispatch(setUsers(items, totalCount));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFetching(false));
  }
};

export const cleanUsers = (): UsersThunkAction => (dispatch) => dispatch(setUsers([], 0));

export const follow = (userId: number): UsersAsyncThunkAction => async (dispatch) => {
  dispatch(setFollowing(true, userId));

  try {
    const {resultCode, messages} = await followAPI.follow(userId);

    if (resultCode !== ResultCode.SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setFollow(userId));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFollowing(false, userId));
  }
};

export const unfollow = (userId: number): UsersAsyncThunkAction => async (dispatch) => {
  dispatch(setFollowing(true, userId));

  try {
    const {resultCode, messages} = await followAPI.unFollow(userId);

    if (resultCode !== ResultCode.SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setUnfollow(userId));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFollowing(false, userId));
  }
};
