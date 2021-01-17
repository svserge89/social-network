export enum Relation {
  ALL,
  FRIENDS,
  NOT_FRIENDS,
}

export type UsersQueryParams = {
  page?: number;
  size?: number;
  relation?: number;
  filter?: string;
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_RELATION = Relation.ALL;
export const DEFAULT_FILTER = '';
export const DEFAULT_SIZE_INDEX = 0;
