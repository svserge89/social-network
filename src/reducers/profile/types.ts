import {ThunkAction} from 'redux-thunk';
import {FormAction} from 'redux-form';

import {Photos, Profile} from '../../models/types';
import {RootState} from '../../store/types';

const PREFIX = 'social-network/profile/';

export const SET_PROFILE = PREFIX + 'SET-PROFILE';
export const SET_STATUS = PREFIX + 'SET-STATUS';
export const SET_PHOTO = PREFIX + 'SET-PHOTO';
export const SET_FETCHING = PREFIX + 'SET-FETCHING';
export const SET_FETCHING_STATUS = PREFIX + 'SET-FETCHING-STATUS';
export const SET_FETCHING_PHOTO = PREFIX + 'SET-FETCHING-PHOTO';
export const SET_UPDATING = PREFIX + 'SET-UPDATING';

export type SetProfileAction = {
  type: typeof SET_PROFILE
  data: { profile: Profile }
}

export type SetStatusAction = {
  type: typeof SET_STATUS
  data: { status: string }
}

export type SetPhotoAction = {
  type: typeof SET_PHOTO
  data: { photos: Photos }
}

export type SetFetchingAction = {
  type: typeof SET_FETCHING
  data: { fetching: boolean }
}

export type SetFetchingStatusAction = {
  type: typeof SET_FETCHING_STATUS
  data: { fetchingStatus: boolean }
}

export type SetFetchingPhotoAction = {
  type: typeof SET_FETCHING_PHOTO
  data: { fetchingPhoto: boolean }
}

export type SetUpdatingAction = {
  type: typeof SET_UPDATING
  data: { updating: boolean }
}

export type ProfileAction = SetProfileAction
  | SetStatusAction
  | SetPhotoAction
  | SetFetchingAction
  | SetFetchingStatusAction
  | SetFetchingPhotoAction
  | SetUpdatingAction;

export type ProfileThunkAction = ThunkAction<void, RootState, unknown, ProfileAction>;

export type ProfileAsyncThunkAction =
  ThunkAction<Promise<void>, RootState, unknown, ProfileAction | FormAction>;

export type ProfileState = {
  profile: Profile
  contactLabels: Map<string, string>
  fetching: boolean
  fetchingStatus: boolean
  fetchingPhoto: boolean
  updating: boolean
  status: string | null
}