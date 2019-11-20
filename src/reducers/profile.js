import { profileAPI } from '../api/api';

const PREFIX = "social-network/profile/";

const SET_PROFILE = PREFIX + "SET-PROFILE";
const SET_FETCHING = PREFIX + "SET-FETCHING";
const SET_STATUS = PREFIX + "SET-STATUS";

// Action creators
const setProfile = (profile) => ({
  type: SET_PROFILE,
  profile
});

const setFetching = (fetching) => ({
  type: SET_FETCHING,
  fetching
});

const setStatus = (status) => ({
  type: SET_STATUS,
  status
});

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

export const getStatus = (userId) => async (dispatch) => {
  const status = await profileAPI.getStatus(userId);

  dispatch(setStatus(status));
};

export const updateStatus = (status) => async (dispatch) => {
  const { resultCode } = await profileAPI.updateStatus(status);

  if (resultCode) return;

  dispatch(setStatus(status));
};

// Utils
const changeProfile = (state, profile) => ({
  ...state,
  profile
});

const changeFetching = (state, fetching) => ({
  ...state,
  fetching
});

const changeStatus = (state, status) => ({
  ...state,
  status
});

const initialState = {
  profile: {
    photos: {}
  },
  fetching: false,
  status: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return changeProfile(state, action.profile);
    case SET_STATUS:
      return changeStatus(state, action.status);
    case SET_FETCHING:
      return changeFetching(state, action.fetching);
    default:
      return state;
  }
};

export default profileReducer;