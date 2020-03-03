import {
  FOLLOW,
  SET_FETCHING,
  SET_FOLLOWING,
  SET_PAGE,
  SET_SIZE,
  SET_USERS,
  SetFollowAction,
  SetFollowingAction,
  SetUnfollowAction,
  UNFOLLOW,
  UsersAction,
  UsersState
} from './types';

const changeFollowed = (state: UsersState,
                        {data: {userId}}: SetFollowAction | SetUnfollowAction,
                        followed: boolean): UsersState => ({
  ...state,
  users: state.users.map(user => user.id !== userId ? user : {...user, followed})
});

const changeData = (state: UsersState, {data}: UsersAction): UsersState => ({...state, ...data});

const changeFollowing = (state: UsersState,
                         {data: {userId, status}}: SetFollowingAction): UsersState => ({
  ...state,
  following: (
    status ? [...state.following, userId] : state.following.filter(item => item !== userId)
  )
});

const initialState: UsersState = {
  users: [],
  size: 5,
  total: 0,
  page: 1,
  fetching: false,
  following: [],
  available: [5, 10, 25, 50]
};

const usersReducer = (state = initialState, action: UsersAction) => {
  switch (action.type) {
    case FOLLOW:
      return changeFollowed(state, action as SetFollowAction, true);
    case UNFOLLOW:
      return changeFollowed(state, action as SetUnfollowAction, false);
    case SET_USERS:
    case SET_PAGE:
    case SET_SIZE:
    case SET_FETCHING:
      return changeData(state, action);
    case SET_FOLLOWING:
      return changeFollowing(state, action as SetFollowingAction);
    default:
      return state;
  }
};

export default usersReducer;