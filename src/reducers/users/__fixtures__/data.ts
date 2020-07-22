import {User} from '../../../models/types';
import {
  FOLLOW,
  Relation,
  SET_FETCHING,
  SET_FILTER,
  SET_FOLLOWING,
  SET_PAGE,
  SET_RELATION,
  SET_SIZE,
  SET_USERS,
  UNFOLLOW,
  UsersAction,
  UsersState
} from '../types';

export const USER_ID = 42;
export const USERS: User[] = [
  {
    id: USER_ID - 1,
    name: 'test user 1',
    status: 'test status 1',
    photos: {large: 'test/large/photo1', small: 'test/small/photo1'},
    followed: true
  },
  {
    id: USER_ID,
    name: 'test user 2',
    status: 'test status 2',
    photos: {large: 'test/large/photo2', small: 'test/small/photo2'},
    followed: false
  },
  {
    id: USER_ID + 1,
    name: 'test user 3',
    status: null,
    photos: {large: null, small: null},
    followed: false
  }
];
export const USERS_WITH_FOLLOWED = USERS.map(user => user.id === USER_ID ? {...user, followed: true} : user);
export const TOTAL = 42;
export const PAGE = 42;
export const SIZE = 42;
export const FILTER = 'test filter';
export const FOLLOWING = [100, 200, 300, 400];
export const FOLLOWING_WITH_USER_ID = [100, 200, 300, 400, USER_ID];

export const INITIAL_STATE: UsersState = {
  users: [],
  size: 5,
  total: 0,
  page: 1,
  fetching: false,
  following: [],
  available: [5, 10, 25, 50],
  relation: Relation.ALL,
  filter: ''
};
export const STATE_WITH_USERS: UsersState = {...INITIAL_STATE, users: [...USERS]};
export const STATE_WITH_USERS_FOLLOWED: UsersState = {...INITIAL_STATE, users: [...USERS_WITH_FOLLOWED]};
export const STATE_WITH_USERS_AND_TOTAL: UsersState = {...STATE_WITH_USERS, total: TOTAL};
export const STATE_WITH_PAGE: UsersState = {...INITIAL_STATE, page: PAGE};
export const STATE_WITH_SIZE: UsersState = {...INITIAL_STATE, size: SIZE, page: 1};
export const STATE_WITH_FETCHING_TRUE: UsersState = {...INITIAL_STATE, fetching: true};
export const STATE_WITH_RELATION_FRIENDS: UsersState = {...INITIAL_STATE, relation: Relation.FRIENDS, page: 1};
export const STATE_WITH_FILTER: UsersState = {...INITIAL_STATE, filter: FILTER, page: 1};
export const STATE_WITH_FOLLOWING: UsersState = {...INITIAL_STATE, following: [...FOLLOWING]};
export const STATE_WITH_FOLLOWING_USER_ID: UsersState = {...INITIAL_STATE, following: [...FOLLOWING_WITH_USER_ID]};

export const EMPTY_ACTION = {} as UsersAction;
export const SET_FOLLOW_ACTION: UsersAction = {type: FOLLOW, payload: {userId: USER_ID}};
export const SET_UNFOLLOW_ACTION: UsersAction = {type: UNFOLLOW, payload: {userId: USER_ID}};
export const SET_USERS_ACTION: UsersAction = {type: SET_USERS, payload: {users: USERS, total: TOTAL}};
export const SET_RELATION_ALL_ACTION: UsersAction = {type: SET_RELATION, payload: {relation: Relation.ALL, page: 1}};
export const SET_RELATION_FRIENDS_ACTION: UsersAction = {
  type: SET_RELATION,
  payload: {relation: Relation.FRIENDS, page: 1}
};
export const SET_FILTER_ACTION: UsersAction = {type: SET_FILTER, payload: {filter: FILTER, page: 1}};
export const SET_PAGE_ACTION: UsersAction = {type: SET_PAGE, payload: {page: PAGE}};
export const SET_SIZE_ACTION: UsersAction = {type: SET_SIZE, payload: {size: SIZE, page: 1}};
export const SET_FETCHING_TRUE_ACTION: UsersAction = {type: SET_FETCHING, payload: {fetching: true}};
export const SET_FETCHING_FALSE_ACTION: UsersAction = {type: SET_FETCHING, payload: {fetching: false}};
export const SET_FOLLOWING_TRUE_ACTION: UsersAction = {type: SET_FOLLOWING, payload: {userId: USER_ID, status: true}};
export const SET_FOLLOWING_FALSE_ACTION: UsersAction = {type: SET_FOLLOWING, payload: {userId: USER_ID, status: false}};
