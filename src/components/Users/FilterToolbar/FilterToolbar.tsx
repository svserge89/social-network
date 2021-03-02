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
  filterOnly = false,
  fetching = false,
}) => {
  const showRelation = (): JSX.Element | '' =>
    !filterOnly ? (
      <RelationSelector
        relation={relation}
        setRelation={setRelation}
        fetching={fetching}
      />
    ) : (
      ''
    );

  return (
    <ButtonToolbar className="px-0 mt-3">
      <Filter filter={filter} setFilter={setFilter} fetching={fetching} />
      {showRelation()}
    </ButtonToolbar>
  );
};

export default React.memo(FilterToolbar);
