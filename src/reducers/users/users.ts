import {
  FOLLOW,
  SET_FETCHING,
  SET_FOLLOWING,
  SET_PAGE,
  SET_SIZE,
  SET_USERS,
  UNFOLLOW,
  UsersState
} from './types';

const changeFollowed = (state: UsersState, userId: number, followed: boolean): UsersState => ({
  ...state,
  users: state.users.map(user => user.id !== userId ? user : {...user, followed})
});

const changeData = (state: UsersState, data: any): UsersState => ({...state, ...data});

const changeFollowing = (state: UsersState, userId: number, status: boolean): UsersState => ({
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

const usersReducer = (state = initialState, action: any) => {
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