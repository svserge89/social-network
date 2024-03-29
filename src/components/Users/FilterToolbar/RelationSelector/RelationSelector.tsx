import React, {useCallback} from 'react';
import {FormSelect, InputGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';

import {RelationSelectorProps} from './types';
import {Relation} from '../../../../hooks/types';

const RelationSelector: React.FC<RelationSelectorProps> = ({
  relation,
  setRelation,
  fetching = false,
}) => {
  const relationHandler = useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) =>
      setRelation(+value),
    [setRelation]
  );

  return (
    <InputGroup className="ms-3">
      <InputGroup.Text>
        <FontAwesomeIcon icon={faUserFriends} />
      </InputGroup.Text>
      <FormSelect
        value={relation}
        onChange={relationHandler}
        disabled={fetching}
      >
        <option value={Relation.ALL}>All</option>
        <option value={Relation.FRIENDS}>Friends</option>
        <option value={Relation.NOT_FRIENDS}>Not friends</option>
      </FormSelect>
    </InputGroup>
  );
};

export default React.memo(RelationSelector);
