import React, {useCallback, useEffect, useState} from 'react';
import {FormControl, InputGroup} from 'react-bootstrap';
import {faSearch, faUndo} from '@fortawesome/free-solid-svg-icons';

import {FilterProps} from './types';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';

const Filter: React.FC<FilterProps> = ({
  filter,
  setFilter,
  fetching = false,
}) => {
  const [value, setValue] = useState(filter);

  useEffect(() => {
    setValue(filter);
  }, [filter, setValue]);

  const changeValueHandler = useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLInputElement>) =>
      setValue(value.trim()),
    [setValue]
  );

  const filterHandler = useCallback(() => {
    if (value !== filter) {
      setFilter(value);
    }
  }, [value, setFilter, filter]);

  const keyDownHandler = useCallback(
    ({key}: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Enter') {
        filterHandler();
      }
    },
    [filterHandler]
  );

  const cleanHandler = useCallback(() => {
    setValue('');
    setFilter('');
  }, [setFilter]);

  const isFilterAvailable = !!value && value !== filter;

  return (
    <InputGroup className="flex-fill">
      <ButtonWithIcon
        variant="outline-secondary"
        onClick={filterHandler}
        icon={faSearch}
        disabled={fetching || !isFilterAvailable}
      >
        Filter
      </ButtonWithIcon>
      <FormControl
        placeholder="Filter by user name..."
        value={value}
        onChange={changeValueHandler}
        onKeyDown={keyDownHandler}
        disabled={fetching}
      />
      <ButtonWithIcon
        variant="outline-secondary"
        onClick={cleanHandler}
        icon={faUndo}
        disabled={fetching || !filter}
      >
        Clean
      </ButtonWithIcon>
    </InputGroup>
  );
};

export default React.memo(Filter);
