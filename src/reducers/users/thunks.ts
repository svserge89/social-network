import {usersAPI} from '../../api/api';
import {handleError, handleServerError} from '../../utils/errorHandler';
import {SUCCESS} from '../../utils/responseCodes';
import {setFetching, setFollow, setFollowing, setUnfollow, setUsers} from './actionCreators';

export const getUsers = (page: number, size: number) => async (dispatch: any) => {
  dispatch(setFetching(true));

  try {
    const {items, totalCount} = await usersAPI.get(size, page);

    dispatch(setUsers(items, totalCount));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFetching(false));
  }
};

export const cleanUsers = () => (dispatch: any) => dispatch(setUsers([], 0));

export const follow = (userId: number) => async (dispatch: any) => {
  dispatch(setFollowing(true, userId));

  try {
    const {resultCode, messages} = await usersAPI.follow(userId);

    if (resultCode !== SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setFollow(userId));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFollowing(false, userId));
  }
};

export const unfollow = (userId: number) => async (dispatch: any) => {
  dispatch(setFollowing(true, userId));

  try {
    const {resultCode, messages} = await usersAPI.unFollow(userId);

    if (resultCode !== SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setUnfollow(userId));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFollowing(false, userId));
  }
};