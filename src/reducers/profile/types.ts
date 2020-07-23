import {ThunkAction} from 'redux-thunk';

import {Photos, Profile} from '../../models/types';
import {RootState} from '../../store/types';

export const SET_PROFILE = 'social-network/profile/SET-PROFILE';
export const SET_STATUS = 'social-network/profile/SET-STATUS';
export const SET_PHOTO = 'social-network/profile/SET-PHOTO';
export const SET_FETCHING = 'social-network/profile/SET-FETCHING';
export const SET_FETCHING_STATUS = 'social-network/profile/SET-FETCHING-STATUS';
export const SET_FETCHING_PHOTO = 'social-network/profile/SET-FETCHING-PHOTO';
export const SET_UPDATING = 'social-network/profile/SET-UPDATING';
export const SET_FOLLOWED = 'social-network/profile/SET-FOLLOWED';
export const SET_FOLLOWING = 'social-network/profile/SET-FOLLOWING';

export type SetProfileAction = {
  type: typeof SET_PROFILE;
  payload: {profile: Profile};
};

export type SetStatusAction = {
  type: typeof SET_STATUS;
  payload: {status: string};
};

export type SetPhotoAction = {
  type: typeof SET_PHOTO;
  payload: {photos: Photos};
};

export type SetFetchingAction = {
  type: typeof SET_FETCHING;
  payload: {fetching: boolean};
};

export type SetFetchingStatusAction = {
  type: typeof SET_FETCHING_STATUS;
  payload: {fetchingStatus: boolean};
};

export type SetFetchingPhotoAction = {
  type: typeof SET_FETCHING_PHOTO;
  payload: {fetchingPhoto: boolean};
};

export type SetUpdatingAction = {
  type: typeof SET_UPDATING;
  payload: {updating: boolean};
};

export type SetFollowedAction = {
  type: typeof SET_FOLLOWED;
  payload: {followed: boolean};
};

export type SetFollowingAction = {
  type: typeof SET_FOLLOWING;
  payload: {following: boolean};
};

export type ProfileAction =
  | SetProfileAction
  | SetStatusAction
  | SetPhotoAction
  | SetFetchingAction
  | SetFetchingStatusAction
  | SetFetchingPhotoAction
  | SetUpdatingAction
  | SetFollowedAction
  | SetFollowingAction;

export type ProfileThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  ProfileAction
>;

export type ProfileAsyncThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  ProfileAction
>;

export type ProfileState = {
  profile: Profile;
  contactLabels: Map<string, string>;
  fetching: boolean;
  fetchingStatus: boolean;
  fetchingPhoto: boolean;
  updating: boolean;
  status: string | null;
  followed: boolean;
  following: boolean;
};
