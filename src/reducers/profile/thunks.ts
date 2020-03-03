import {stopSubmit} from 'redux-form';

import {profileAPI} from '../../api/api';
import {handleError, handleServerError} from '../../utils/errorHandler';
import {SUCCESS} from '../../utils/responseCodes';
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

export const getProfile = (userId: number) => async (dispatch: any) => {
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

export const updateProfile = (profile: Profile) => async (dispatch: any) => {
  dispatch(setUpdating(true));

  try {
    const {resultCode, messages} = await profileAPI.update(profile);

    if (resultCode !== SUCCESS) {
      dispatch(stopSubmit('profileInfo', parseMessages(messages)));

      return;
    }

    await dispatch(getProfile(profile.userId));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setUpdating(false));
  }
};

export const cleanProfile = () => (dispatch: any) => (
  dispatch(setProfile({...emptyProfile}))
);

export const getStatus = (userId: number) => async (dispatch: any) => {
  const status = await profileAPI.getStatus(userId);

  dispatch(setStatus(status));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  dispatch(setFetchingStatus(true));

  try {
    const {resultCode, messages} = await profileAPI.updateStatus(status);

    if (resultCode !== SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setStatus(status));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const updatePhoto = (image: string) => async (dispatch: any) => {
  dispatch(setFetchingPhoto(true));

  try {
    const {resultCode, data: {photos}, messages} = await profileAPI.updatePhoto(image);

    if (resultCode !== SUCCESS) handleServerError(dispatch, messages);
    else dispatch(setPhoto(photos));
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(setFetchingPhoto(false));
  }
};