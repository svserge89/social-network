import React from 'react';
import {ButtonToolbar} from 'react-bootstrap';

import Filter from '../../common/Filter/Filter';
import {FilterToolbarProps} from './types';
import RelationSelector from './RelationSelector/RelationSelector';

const FilterToolbar: React.FC<FilterToolbarProps> = ({
                                                       filter,
                                                       relation,
                                                       setFilter,
                                                       setRelation,
                                                       fetching = false
                                                     }) => (
  <ButtonToolbar className="px-0 mt-3">
    <Filter filter={filter} setFilter={setFilter} fetching={fetching}/>
    <RelationSelector relation={relation} setRelation={setRelation} fetching={fetching}/>
  </ButtonToolbar>
);

export default FilterToolbar;
