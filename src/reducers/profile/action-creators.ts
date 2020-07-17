import {
  SET_FETCHING,
  SET_FETCHING_PHOTO,
  SET_FETCHING_STATUS,
  SET_FOLLOWED,
  SET_FOLLOWING,
  SET_PHOTO,
  SET_PROFILE,
  SET_STATUS,
  SET_UPDATING,
  SetFetchingAction,
  SetFetchingPhotoAction,
  SetFetchingStatusAction,
  SetFollowedAction,
  SetFollowingAction,
  SetPhotoAction,
  SetProfileAction,
  SetStatusAction,
  SetUpdatingAction
} from './types';
import {Photos, Profile} from '../../models/types';

export const setProfile = (profile: Profile): SetProfileAction => ({type: SET_PROFILE, payload: {profile}});

export const setStatus = (status: string): SetStatusAction => ({type: SET_STATUS, payload: {status}});

export const setPhoto = (photos: Photos): SetPhotoAction => ({type: SET_PHOTO, payload: {photos}});

export const setFetching = (fetching: boolean): SetFetchingAction => ({type: SET_FETCHING, payload: {fetching}});

export const setFetchingStatus = (fetchingStatus: boolean): SetFetchingStatusAction => ({
  type: SET_FETCHING_STATUS,
  payload: {fetchingStatus}
});

export const setFetchingPhoto = (fetchingPhoto: boolean): SetFetchingPhotoAction => ({
  type: SET_FETCHING_PHOTO,
  payload: {fetchingPhoto}
});

export const setUpdating = (updating: boolean): SetUpdatingAction => ({type: SET_UPDATING, payload: {updating}});

export const setFollowed = (followed: boolean): SetFollowedAction => ({type: SET_FOLLOWED, payload: {followed}});

export const setFollowing = (following: boolean): SetFollowingAction => ({type: SET_FOLLOWING, payload: {following}});
