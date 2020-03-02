import {
  SET_FETCHING,
  SET_FETCHING_PHOTO,
  SET_FETCHING_STATUS,
  SET_PHOTO,
  SET_PROFILE,
  SET_STATUS,
  SET_UPDATING,
  SetFetchingAction,
  SetFetchingPhotoAction,
  SetFetchingStatusAction,
  SetPhotoAction,
  SetProfileAction,
  SetStatusAction,
  SetUpdatingAction
} from './types';
import {Photos, Profile} from '../../models/types';

export const setProfile = (profile: Profile): SetProfileAction => ({
  type: SET_PROFILE,
  data: {profile}
});

export const setStatus = (status: string): SetStatusAction => ({type: SET_STATUS, data: {status}});

export const setPhoto = (photos: Photos): SetPhotoAction => ({type: SET_PHOTO, photos});

export const setFetching = (fetching: boolean): SetFetchingAction => ({
  type: SET_FETCHING,
  data: {fetching}
});

export const setFetchingStatus = (fetchingStatus: boolean): SetFetchingStatusAction => ({
  type: SET_FETCHING_STATUS,
  data: {fetchingStatus}
});

export const setFetchingPhoto = (fetchingPhoto: boolean): SetFetchingPhotoAction => ({
  type: SET_FETCHING_PHOTO,
  data: {fetchingPhoto}
});

export const setUpdating = (updating: boolean): SetUpdatingAction => ({
  type: SET_UPDATING,
  data: {updating}
});