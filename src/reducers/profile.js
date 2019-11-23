import { profileAPI } from '../api/api';

const PREFIX = "social-network/profile/";

const SET_PROFILE = PREFIX + "SET-PROFILE";
const SET_FETCHING = PREFIX + "SET-FETCHING";
const SET_FETCHING_STATUS = PREFIX + "SET-FETCHING-STATUS";
const SET_STATUS = PREFIX + "SET-STATUS";

// Action creators
const setProfile = (profile) => ({ type: SET_PROFILE, data: { profile } });

const setFetching = (fetching) => ({ type: SET_FETCHING, data: { fetching } });

const setFetchingStatus = (fetchingStatus) => ({
  type: SET_FETCHING_STATUS,
  data: { fetchingStatus }
});

const setStatus = (status) => ({ type: SET_STATUS, data: { status } });

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
  dispatch(setFetchingStatus(true));

  try {
    const { resultCode } = await profileAPI.updateStatus(status);

    if (resultCode) return;

    dispatch(setStatus(status));
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

// Utils
const chandeData = (state, data) => ({ ...state, ...data });

const initialState = {
  profile: {
    contacts: {},
    photos: {}
  },
  fetching: false,
  fetchingStatus: false,
  status: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
    case SET_STATUS:
    case SET_FETCHING:
    case SET_FETCHING_STATUS:
      return chandeData(state, action.data);
    default:
      return state;
  }
};

export default profileReducer;