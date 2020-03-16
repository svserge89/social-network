import {profileAPI} from '../../api/api';
import {handleError, handleServerError} from '../../utils/errorHandler';
import {ResultCode} from '../../utils/responseCodes';
import {parseMessages} from '../../utils/errorParser';
import {
  setFetching,
  setFetchingPhoto,
  setFetchingStatus,
  setPhoto,
  setProfile,
  setStatus,
  setUpdating
} from './actionCreators';
import {Profile} from '../../models/types';
import emptyProfile from './emptyProfile';
import {ProfileAsyncThunkAction, ProfileThunkAction} from './types';

export const getProfile = (userId: number): ProfileAsyncThunkAction => async (dispatch) => {
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

export const updateProfile = (profile: Profile): ProfileAsyncThunkAction => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const {resultCode, messages} = await profileAPI.update(profile);

    if (resultCode !== ResultCode.SUCCESS) throw parseMessages(messages);

    await dispatch(getProfile(profile.userId));
  } catch (error) {
    if (error.submissionError) throw error;

    handleError(dispatch, error);
  } finally {
    dispatch(setUpdating(false));
  }
};

export const cleanProfile = (): ProfileThunkAction => (dispatch) => (
  dispatch(setProfile({...emptyProfile}))
);

export const getStatus = (userId: number): ProfileAsyncThunkAction => async (dispatch) => {
  try {
    const status = await profileAPI.getStatus(userId);

    dispatch(setStatus(status));
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const updateStatus = (status: string): ProfileAsyncThunkAction => async (dispatch) => {
  dispatch(setFetchingStatus(true));

  try {
    const {resultCode, messages} = await profileAPI.updateStatus(status);

    if (resultCode !== ResultCode.SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setStatus(status));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const updatePhoto = (image: File): ProfileAsyncThunkAction => async (dispatch) => {
  dispatch(setFetchingPhoto(true));

  try {
    const {resultCode, data: {photos}, messages} = await profileAPI.updatePhoto(image);

    if (resultCode !== ResultCode.SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setPhoto(photos));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFetchingPhoto(false));
  }
};
