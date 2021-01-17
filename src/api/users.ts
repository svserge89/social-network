import instance, {responseData} from './base';
import {Relation} from '../hooks/types';
import {GetUsersResponse, UsersRequestParams} from './types';

const USERS = '/users';

const usersAPI = {
  get: (
    count: number,
    page: number,
    relation: Relation = Relation.ALL,
    filter: string = ''
  ) => {
    const params: UsersRequestParams = {count, page};

    switch (relation) {
      case Relation.FRIENDS:
        params.friend = true;
        break;
      case Relation.NOT_FRIENDS:
        params.friend = false;
        break;
    }

    if (filter) {
      params.term = filter;
    }

    return instance
      .get<GetUsersResponse>(USERS, {params})
      .then(responseData);
  },
};

export default usersAPI;
