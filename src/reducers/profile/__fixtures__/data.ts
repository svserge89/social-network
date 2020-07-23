import {Photos, Profile} from '../../../models/types';
import {
  ProfileAction,
  ProfileState,
  SET_FETCHING,
  SET_FETCHING_PHOTO,
  SET_FETCHING_STATUS,
  SET_FOLLOWED,
  SET_FOLLOWING,
  SET_PHOTO,
  SET_PROFILE,
  SET_STATUS,
  SET_UPDATING,
} from '../types';
import emptyProfile from '../empty-profile';
import {RootState} from '../../../store/types';
import {
  FollowResponse,
  UnFollowResponse,
  UpdatePhotoResponse,
  UpdateProfileResponse,
  UpdateStatusResponse,
} from '../../../api/types';
import {ResultCode} from '../../../utils/response-codes';
import {ERROR_MESSAGE} from '../../error/__fixtures__/data';

export const STATUS = 'test status';
export const USER_ID = 42;
export const PHOTOS: Photos = {
  small: 'small/photo/url',
  large: 'large/photo/url',
};
export const PROFILE: Profile = {
  userId: USER_ID,
  fullName: 'test user',
  aboutMe: 'some info about test user',
  lookingForAJob: true,
  lookingForAJobDescription: 'some looking for a job description',
  contacts: {
    facebook: 'facebook.com',
    github: 'github.com',
    instagram: 'instagram.com',
    twitter: 'twitter.com',
    mainLink: 'main.link.com',
    vk: 'vk.com',
    youtube: 'youtube.com',
    website: 'website.com',
  },
  photos: PHOTOS,
};
export const PHOTO: File = new File(['image_file'], 'image_file.png', {
  type: 'image/png',
});

export const INITIAL_STATE: ProfileState = {
  profile: {...emptyProfile},
  contactLabels: new Map([
    ['github', 'GitHub'],
    ['facebook', 'Facebook'],
    ['vk', 'VK'],
    ['twitter', 'Twitter'],
    ['instagram', 'Instagram'],
    ['youtube', 'Youtube'],
    ['website', 'Web Site'],
    ['mainLink', 'Main Link'],
  ]),
  fetching: false,
  fetchingStatus: false,
  fetchingPhoto: false,
  updating: false,
  status: null,
  followed: false,
  following: false,
};
export const STATE_WITH_PROFILE: ProfileState = {
  ...INITIAL_STATE,
  profile: {...PROFILE},
};
export const STATE_WITH_EMPTY_PROFILE: ProfileState = {
  ...INITIAL_STATE,
  profile: {...emptyProfile},
};
export const STATE_WITH_STATUS: ProfileState = {
  ...INITIAL_STATE,
  status: STATUS,
};
export const STATE_WITH_FETCHING_TRUE: ProfileState = {
  ...INITIAL_STATE,
  fetching: true,
};
export const STATE_WITH_FETCHING_STATUS_TRUE: ProfileState = {
  ...INITIAL_STATE,
  fetchingStatus: true,
};
export const STATE_WITH_FETCHING_PHOTO_TRUE: ProfileState = {
  ...INITIAL_STATE,
  fetchingPhoto: true,
};
export const STATE_WITH_UPDATING_TRUE: ProfileState = {
  ...INITIAL_STATE,
  updating: true,
};
export const STATE_WITH_FOLLOWED_TRUE: ProfileState = {
  ...INITIAL_STATE,
  followed: true,
};
export const STATE_WITH_FOLLOWING_TRUE: ProfileState = {
  ...INITIAL_STATE,
  following: true,
};
export const STATE_WITH_PROFILE_PHOTOS: ProfileState = {
  ...INITIAL_STATE,
  profile: {...INITIAL_STATE.profile, photos: {...PHOTOS}},
};

export const ROOT_STATE: Partial<RootState> = {profile: {...INITIAL_STATE}};
export const ROOT_STATE_WITH_PROFILE: Partial<RootState> = {
  profile: {...INITIAL_STATE, profile: {...PROFILE}},
};

export const SUCCESS_UPDATE_PROFILE_RESPONSE: UpdateProfileResponse = {
  resultCode: ResultCode.SUCCESS,
  messages: [],
  data: {},
};
export const ERROR_UPDATE_PROFILE_RESPONSE: UpdateProfileResponse = {
  resultCode: ResultCode.ERROR,
  messages: [ERROR_MESSAGE],
};
export const SUCCESS_UPDATE_STATUS_RESPONSE: UpdateStatusResponse = SUCCESS_UPDATE_PROFILE_RESPONSE;
export const ERROR_UPDATE_STATUS_RESPONSE: UpdateStatusResponse = ERROR_UPDATE_PROFILE_RESPONSE;
export const SUCCESS_UPDATE_PHOTO_RESPONSE: UpdatePhotoResponse = {
  resultCode: ResultCode.SUCCESS,
  messages: [],
  data: {photos: PHOTOS},
};
export const ERROR_UPDATE_PHOTO_RESPONSE: UpdatePhotoResponse = {
  resultCode: ResultCode.ERROR,
  messages: [ERROR_MESSAGE],
};
export const SUCCESS_FOLLOW_RESPONSE: FollowResponse = SUCCESS_UPDATE_PROFILE_RESPONSE;
export const ERROR_FOLLOW_RESPONSE: FollowResponse = ERROR_UPDATE_PROFILE_RESPONSE;
export const SUCCESS_UNFOLLOW_RESPONSE: UnFollowResponse = SUCCESS_UPDATE_PROFILE_RESPONSE;
export const ERROR_UNFOLLOW_RESPONSE: UnFollowResponse = ERROR_UPDATE_PROFILE_RESPONSE;

export const EMPTY_ACTION = {} as ProfileAction;
export const SET_PROFILE_ACTION: ProfileAction = {
  type: SET_PROFILE,
  payload: {profile: {...PROFILE}},
};
export const SET_PROFILE_EMPTY_ACTION: ProfileAction = {
  type: SET_PROFILE,
  payload: {profile: emptyProfile},
};
export const SET_STATUS_ACTION: ProfileAction = {
  type: SET_STATUS,
  payload: {status: STATUS},
};
export const SET_PHOTO_ACTION: ProfileAction = {
  type: SET_PHOTO,
  payload: {photos: {...PHOTOS}},
};
export const SET_FETCHING_TRUE_ACTION: ProfileAction = {
  type: SET_FETCHING,
  payload: {fetching: true},
};
export const SET_FETCHING_FALSE_ACTION: ProfileAction = {
  type: SET_FETCHING,
  payload: {fetching: false},
};
export const SET_FETCHING_STATUS_TRUE_ACTION: ProfileAction = {
  type: SET_FETCHING_STATUS,
  payload: {fetchingStatus: true},
};
export const SET_FETCHING_STATUS_FALSE_ACTION: ProfileAction = {
  type: SET_FETCHING_STATUS,
  payload: {fetchingStatus: false},
};
export const SET_FETCHING_PHOTO_TRUE_ACTION: ProfileAction = {
  type: SET_FETCHING_PHOTO,
  payload: {fetchingPhoto: true},
};
export const SET_FETCHING_PHOTO_FALSE_ACTION: ProfileAction = {
  type: SET_FETCHING_PHOTO,
  payload: {fetchingPhoto: false},
};
export const SET_UPDATING_TRUE_ACTION: ProfileAction = {
  type: SET_UPDATING,
  payload: {updating: true},
};
export const SET_UPDATING_FALSE_ACTION: ProfileAction = {
  type: SET_UPDATING,
  payload: {updating: false},
};
export const SET_FOLLOWED_TRUE_ACTION: ProfileAction = {
  type: SET_FOLLOWED,
  payload: {followed: true},
};
export const SET_FOLLOWED_FALSE_ACTION: ProfileAction = {
  type: SET_FOLLOWED,
  payload: {followed: false},
};
export const SET_FOLLOWING_TRUE_ACTION: ProfileAction = {
  type: SET_FOLLOWING,
  payload: {following: true},
};
export const SET_FOLLOWING_FALSE_ACTION: ProfileAction = {
  type: SET_FOLLOWING,
  payload: {following: false},
};
