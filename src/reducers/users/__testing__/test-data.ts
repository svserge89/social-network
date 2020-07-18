import {User} from '../../../models/types';
import {Relation, SET_RELATION, UsersAction, UsersState} from '../types';

export const TEST_USERS: User[] = [
  {
    id: 1,
    name: 'test user 1',
    status: 'test status 1',
    photos: {large: 'test/large/photo1', small: 'test/small/photo1'},
    followed: true
  },
  {
    id: 2,
    name: 'test user 2',
    status: 'test status 2',
    photos: {large: 'test/large/photo2', small: 'test/small/photo2'},
    followed: false
  },
  {
    id: 3,
    name: 'test user 3',
    status: null,
    photos: {large: null, small: null},
    followed: false
  }
];

export const TEST_INITIAL_STATE: UsersState = {
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

export const TEST_SET_RELATION_ALL_ACTION: UsersAction = {
  type: SET_RELATION,
  payload: {relation: Relation.ALL, page: 1}
};
