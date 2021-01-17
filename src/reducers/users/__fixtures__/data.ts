import {User} from '../../../models/types';
import {ResultCode} from '../../../utils/response-codes';
import {RootState} from '../../../store/types';
import {
  FollowResponse,
  GetUsersResponse,
  UnFollowResponse,
} from '../../../api/types';
import {
  FOLLOW,
  SET_FETCHING,
  SET_FOLLOWING,
  SET_USERS,
  UNFOLLOW,
  UsersAction,
  UsersState,
} from '../types';
import {ERROR_MESSAGE} from '../../error/__fixtures__/data';

export const USER_ID = 42;
export const USERS: User[] = [
  {
    id: USER_ID - 1,
    name: 'test user 1',
    status: 'test status 1',
    photos: {large: 'test/large/photo1', small: 'test/small/photo1'},
    followed: true,
  },
  {
    id: USER_ID,
    name: 'test user 2',
    status: 'test status 2',
    photos: {large: 'test/large/photo2', small: 'test/small/photo2'},
    followed: false,
  },
  {
    id: USER_ID + 1,
    name: 'test user 3',
    status: null,
    photos: {large: null, small: null},
    followed: false,
  },
];
export const USERS_WITH_FOLLOWED = USERS.map((user) =>
  user.id === USER_ID ? {...user, followed: true} : user
);
export const TOTAL = 42;
export const FOLLOWING = [100, 200, 300, 400];
export const FOLLOWING_WITH_USER_ID = [100, 200, 300, 400, USER_ID];
export const PAGE = 42;
export const SIZE = 42;
export const FILTER = 'test filter';

export const INITIAL_STATE: UsersState = {
  users: [],
  total: 0,
  fetching: false,
  following: [],
  available: [5, 10, 25, 50],
};
export const STATE_WITH_USERS: UsersState = {
  ...INITIAL_STATE,
  users: [...USERS],
};
export const STATE_WITH_USERS_FOLLOWED: UsersState = {
  ...INITIAL_STATE,
  users: [...USERS_WITH_FOLLOWED],
};
export const STATE_WITH_USERS_AND_TOTAL: UsersState = {
  ...STATE_WITH_USERS,
  total: TOTAL,
};
export const STATE_WITH_FETCHING_TRUE: UsersState = {
  ...INITIAL_STATE,
  fetching: true,
};
export const STATE_WITH_FOLLOWING: UsersState = {
  ...INITIAL_STATE,
  following: [...FOLLOWING],
};
export const STATE_WITH_FOLLOWING_USER_ID: UsersState = {
  ...INITIAL_STATE,
  following: [...FOLLOWING_WITH_USER_ID],
};

export const ROOT_STATE: Partial<RootState> = {users: {...INITIAL_STATE}};

export const SUCCESS_GET_USERS_RESPONSE: GetUsersResponse = {
  items: USERS,
  totalCount: TOTAL,
};
export const ERROR_GET_USERS_RESPONSE: GetUsersResponse = {
  error: ERROR_MESSAGE,
};
export const SUCCESS_FOLLOW_RESPONSE: FollowResponse = {
  resultCode: ResultCode.SUCCESS,
  messages: [],
};
export const ERROR_FOLLOW_RESPONSE: FollowResponse = {
  resultCode: ResultCode.ERROR,
  messages: [ERROR_MESSAGE],
};
export const SUCCESS_UNFOLLOW_RESPONSE: UnFollowResponse = SUCCESS_FOLLOW_RESPONSE;
export const ERROR_UNFOLLOW_RESPONSE: UnFollowResponse = ERROR_FOLLOW_RESPONSE;

export const EMPTY_ACTION = {} as UsersAction;
export const SET_FOLLOW_ACTION: UsersAction = {
  type: FOLLOW,
  payload: {userId: USER_ID},
};
export const SET_UNFOLLOW_ACTION: UsersAction = {
  type: UNFOLLOW,
  payload: {userId: USER_ID},
};
export const SET_USERS_ACTION: UsersAction = {
  type: SET_USERS,
  payload: {users: USERS, total: TOTAL},
};
export const SET_USERS_EMPTY_ACTION: UsersAction = {
  type: SET_USERS,
  payload: {users: [], total: 0},
};
export const SET_FETCHING_TRUE_ACTION: UsersAction = {
  type: SET_FETCHING,
  payload: {fetching: true},
};
export const SET_FETCHING_FALSE_ACTION: UsersAction = {
  type: SET_FETCHING,
  payload: {fetching: false},
};
export const SET_FOLLOWING_TRUE_ACTION: UsersAction = {
  type: SET_FOLLOWING,
  payload: {userId: USER_ID, status: true},
};
export const SET_FOLLOWING_FALSE_ACTION: UsersAction = {
  type: SET_FOLLOWING,
  payload: {userId: USER_ID, status: false},
};
