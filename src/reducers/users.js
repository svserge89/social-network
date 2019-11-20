import { usersAPI } from '../api/api';

const PREFIX = "social-network/users/";

const SET_USERS = PREFIX + "SET-USERS";
const SET_PAGE = PREFIX + "SET-PAGE";
const SET_SIZE = PREFIX + "SET-SIZE";
const SET_FETCHING = PREFIX + "SET-FETCHING";
const SET_FOLLOWING = PREFIX + "SET-FOLLOWING";
const FOLLOW = PREFIX + "FOLLOW";
const UNFOLLOW = PREFIX + "UNFOLLOW";

// Action creators
const setFollow = (userId) => ({ type: FOLLOW, userId });

const setUnfollow = (userId) => ({ type: UNFOLLOW, userId });

const setUsers = (users, total, page) => ({
  type: SET_USERS,
  data: { users, total, page }
});

export const setPage = (page) => ({ type: SET_PAGE, data: { page } });

export const setSize = (size) => ({ type: SET_SIZE, data: { size, page: 1 } });

const setFetching = (fetching) => ({ type: SET_FETCHING, data: { fetching } });

const setFollowing = (status, userId) => ({
  type: SET_FOLLOWING,
  status,
  userId
});

// Thunks
export const getUsers = (page, size) => async (dispatch) => {
  dispatch(setFetching(true));

  try {
    const { items, totalCount } = await usersAPI.get(size, page);

    dispatch(setUsers(items, totalCount, page));
  } finally {
    dispatch(setFetching(false));
  }
};

export const follow = (userId) => async (dispatch) => {
  dispatch(setFollowing(true, userId));

  try {
    const { resultCode } = await usersAPI.follow(userId);

    if (resultCode) return;

    dispatch(setFollow(userId));
  } finally {
    dispatch(setFollowing(false, userId));
  }
};

export const unfollow = (userId) => async (dispatch) => {
  dispatch(setFollowing(true, userId));

  try {
    const { resultCode } = await usersAPI.unFollow(userId);

    if (resultCode) return;

    dispatch(setUnfollow(userId));
  } finally {
    dispatch(setFollowing(false, userId));
  }
};

// Utils
const changeFollowed = (state, userId, followed) => ({
  ...state,
  users: state.users.map(
    user => user.id !== userId ? user : { ...user, followed }
  )
});

const changeData = (state, data) => ({ ...state, ...data });

const changeFollowing = (state, userId, status) => ({
  ...state,
  following: (
    status ?
      [...state.following, userId] :
      state.following.filter(item => item !== userId)
  )
});

const initialState = {
  users: [],
  size: 5,
  tatal: 0,
  page: 1,
  fetching: false,
  following: [],
  available: [5, 10, 25, 50]
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return changeFollowed(state, action.userId, true);
    case UNFOLLOW:
      return changeFollowed(state, action.userId, false);
    case SET_USERS:
    case SET_PAGE:
    case SET_SIZE:
    case SET_FETCHING:
      return changeData(state, action.data);
    case SET_FOLLOWING:
      return changeFollowing(state, action.userId, action.status);
    default:
      return state;
  }
};

export default usersReducer;