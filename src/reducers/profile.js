import {profileAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const PREFIX = "social-network/profile/";

const SET_PROFILE = PREFIX + "SET-PROFILE";
const SET_STATUS = PREFIX + "SET-STATUS";
const SET_PHOTO = PREFIX + "SET-PHOTO";
const SET_FETCHING = PREFIX + "SET-FETCHING";
const SET_FETCHING_STATUS = PREFIX + "SET-FETCHING-STATUS";
const SET_FETCHING_PHOTO = PREFIX + "SET-FETCHING-PHOTO";
const SET_UPDATING = PREFIX + "SET-UPDATING";

// Action creators
const setProfile = (profile) => ({type: SET_PROFILE, data: {profile}});

const setStatus = (status) => ({type: SET_STATUS, data: {status}});

const setPhoto = (photos) => ({type: SET_PHOTO, photos});

const setFetching = (fetching) => ({type: SET_FETCHING, data: {fetching}});

const setFetchingStatus = (fetchingStatus) => ({type: SET_FETCHING_STATUS, data: {fetchingStatus}});

const setFetchingPhoto = (fetchingPhoto) => ({type: SET_FETCHING_PHOTO, data: {fetchingPhoto}});

const setUpdating = (updating) => ({type: SET_UPDATING, data: {updating}});

// Thunks
export const getProfile = (userId) => async (dispatch) => {
  dispatch(setFetching(true));

  try {
    const profile = await profileAPI.get(userId);

    dispatch(setProfile(profile));
  } finally {
    dispatch(setFetching(false));
  }
};

export const updateProfile = (profile) => async (dispatch) => {
  dispatch(setUpdating(true));

  try {
    const {resultCode, messages} = await profileAPI.update(profile);
    const message = messages.length > 0 ? messages[0] : 'Some error';

    if (resultCode) {
      dispatch(stopSubmit('profileInfo', {_error: message}));

      return;
    }

    await dispatch(getProfile(profile.userId));
  } finally {
    dispatch(setUpdating(false));
  }
};

export const getStatus = (userId) => async (dispatch) => {
  const status = await profileAPI.getStatus(userId);

  dispatch(setStatus(status));
};

export const updateStatus = (status) => async (dispatch) => {
  dispatch(setFetchingStatus(true));

  try {
    const {resultCode} = await profileAPI.updateStatus(status);

    if (resultCode) return;

    dispatch(setStatus(status));
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const updatePhoto = (image) => async (dispatch) => {
  dispatch(setFetchingPhoto(true));

  try {
    const {resultCode, data: {photos}} = await profileAPI.updatePhoto(image);

    if (resultCode) return;

    dispatch(setPhoto(photos));
  } finally {
    dispatch(setFetchingPhoto(false))
  }
};

// Utils
const changeData = (state, data) => ({...state, ...data});

const changePhoto = (state, photos) => ({...state, profile: {...state.profile, photos}});

const initialState = {
  profile: {contacts: {}, photos: {}},
  contactLabels: new Map([
    ["github", "GitHub"],
    ["facebook", "Facebook"],
    ["vk", "VK"],
    ["twitter", "Twitter"],
    ["instagram", "Instagram"],
    ["youtube", "Youtube"],
    ["website", "Web Site"],
    ["mainLink", "Main Link"]
  ]),
  fetching: false,
  fetchingStatus: false,
  fetchingPhoto: false,
  updating: false,
  status: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
    case SET_STATUS:
    case SET_FETCHING:
    case SET_FETCHING_STATUS:
    case SET_FETCHING_PHOTO:
    case SET_UPDATING:
      return changeData(state, action.data);
    case SET_PHOTO:
      return changePhoto(state, action.photos);
    default:
      return state;
  }
};

export default profileReducer;