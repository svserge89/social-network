import {Relation} from '../../../reducers/users/types';

export type FilterToolbarProps = {
  relation: Relation;
  filter: string;
  setRelation: (relation: Relation) => void;
  setFilter: (filter: string) => void;
  filterOnly?: boolean;
  fetching?: boolean;
};
