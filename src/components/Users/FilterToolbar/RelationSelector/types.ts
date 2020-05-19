import {Relation} from '../../../../reducers/users/types';

export type RelationSelectorProps = {
  relation: Relation
  setRelation: (relation: Relation) => void
  fetching?: boolean
}
