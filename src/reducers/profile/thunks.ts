import profileAPI from '../../api/profile';
import followAPI from '../../api/follow';
import {handleError, handleServerError} from '../../utils/error-handler';
import {ResultCode} from '../../utils/response-codes';
import {parseMessages} from '../../utils/error-parser';
import {
  setFetching,
  setFetchingPhoto,
  setFetchingStatus,
  setFollowed,
  setFollowing,
  setPhoto,
  setProfile,
  setStatus,
  setUpdating,
} from './action-creators';
import {Profile} from '../../models/types';
import emptyProfile from './empty-profile';
import {ProfileAsyncThunkAction, ProfileThunkAction} from './types';
import {selectUserId} from '../../selectors/profile';

export const getProfile =
  (userId: number): ProfileAsyncThunkAction =>
  async (dispatch) => {
    dispatch(setFetching(true));

    try {
      const profile = await profileAPI.get(userId);

      dispatch(setProfile(profile));
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(setFetching(false));
    }
  };

export const updateProfile =
  (profile: Profile): ProfileAsyncThunkAction =>
  async (dispatch) => {
    dispatch(setUpdating(true));

    try {
      const {resultCode, messages} = await profileAPI.update(profile);

      if (resultCode !== ResultCode.SUCCESS) {
        throw parseMessages(messages);
      }

      await dispatch(setProfile(profile));
    } catch (error) {
      if ((error as any).submissionError) {
        throw error;
      }

      handleError(dispatch, error);
    } finally {
      dispatch(setUpdating(false));
    }
  };

export const cleanProfile = (): ProfileThunkAction => (dispatch) =>
  dispatch(setProfile({...emptyProfile}));

export const getStatus =
  (userId: number): ProfileAsyncThunkAction =>
  async (dispatch) => {
    dispatch(setFetchingStatus(true));

    try {
      const status = await profileAPI.getStatus(userId);

      dispatch(setStatus(status));
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(setFetchingStatus(false));
    }
  };

export const updateStatus =
  (status: string): ProfileAsyncThunkAction =>
  async (dispatch) => {
    dispatch(setFetchingStatus(true));

    try {
      const {resultCode, messages} = await profileAPI.updateStatus(status);

      if (resultCode !== ResultCode.SUCCESS) {
        handleServerError(dispatch, messages);
      } else {
        dispatch(setStatus(status));
      }
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(setFetchingStatus(false));
    }
  };

export const updatePhoto =
  (image: File): ProfileAsyncThunkAction =>
  async (dispatch) => {
    dispatch(setFetchingPhoto(true));

    try {
      const {resultCode, data, messages} = await profileAPI.updatePhoto(image);

      if (resultCode !== ResultCode.SUCCESS) {
        handleServerError(dispatch, messages);
      } else {
        dispatch(setPhoto(data!.photos));
      }
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(setFetchingPhoto(false));
    }
  };

export const getFollowed =
  (): ProfileAsyncThunkAction => async (dispatch, getState) => {
    dispatch(setFollowing(true));

    try {
      const followed = await followAPI.get(selectUserId(getState()));

      dispatch(setFollowed(followed));
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(setFollowing(false));
    }
  };

export const follow =
  (): ProfileAsyncThunkAction => async (dispatch, getState) => {
    dispatch(setFollowing(true));

    try {
      const {resultCode, messages} = await followAPI.follow(
        selectUserId(getState())
      );

      if (resultCode !== ResultCode.SUCCESS) {
        handleServerError(dispatch, messages);
      } else {
        dispatch(setFollowed(true));
      }
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(setFollowing(false));
    }
  };

export const unfollow =
  (): ProfileAsyncThunkAction => async (dispatch, getState) => {
    dispatch(setFollowing(true));

    try {
      const {resultCode, messages} = await followAPI.unFollow(
        selectUserId(getState())
      );

      if (resultCode !== ResultCode.SUCCESS) {
        handleServerError(dispatch, messages);
      } else {
        dispatch(setFollowed(false));
      }
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(setFollowing(false));
    }
  };
