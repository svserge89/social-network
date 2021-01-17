import {Relation} from '../../../../hooks/types';

export type RelationSelectorProps = {
  relation: Relation;
  setRelation: (relation: Relation) => void;
  fetching?: boolean;
};
