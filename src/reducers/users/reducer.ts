import {
  FOLLOW,
  SET_FETCHING,
  SET_FOLLOWING,
  SET_USERS,
  SetFollowAction,
  SetFollowingAction,
  SetUnfollowAction,
  UNFOLLOW,
  UsersAction,
  UsersState,
} from './types';

const changeFollowed = (
  state: UsersState,
  {payload: {userId}}: SetFollowAction | SetUnfollowAction,
  followed: boolean
): UsersState => ({
  ...state,
  users: state.users.map((user) =>
    user.id !== userId ? user : {...user, followed}
  ),
});

const changeData = (state: UsersState, {payload}: UsersAction): UsersState => ({
  ...state,
  ...payload,
});

const changeFollowing = (
  state: UsersState,
  {payload: {userId, status}}: SetFollowingAction
): UsersState => ({
  ...state,
  following: status
    ? [...state.following, userId]
    : state.following.filter((item) => item !== userId),
});

const initialState: UsersState = {
  users: [],
  total: 0,
  fetching: false,
  following: [],
  available: [5, 10, 25, 50],
};

const usersReducer = (state = initialState, action: UsersAction) => {
  switch (action.type) {
    case FOLLOW:
      return changeFollowed(state, action, true);
    case UNFOLLOW:
      return changeFollowed(state, action, false);
    case SET_USERS:
    case SET_FETCHING:
      return changeData(state, action);
    case SET_FOLLOWING:
      return changeFollowing(state, action);
    default:
      return state;
  }
};

export default usersReducer;
