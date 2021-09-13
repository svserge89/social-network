import React, {useCallback} from 'react';
import {Form, InputGroup} from 'react-bootstrap';

import {PageSizeSelectorProps} from './types';

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  available,
  current,
  change,
  disabled,
  size = 'sm',
}) => {
  const changeHandler = useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) => change(+value),
    [change]
  );

  const showOptions = (): Array<JSX.Element> =>
    available.map((value) => <option key={value}>{value}</option>);

  return (
    <InputGroup size={size}>
      <InputGroup.Text>Page size</InputGroup.Text>
      <Form.Select onChange={changeHandler} value={current} disabled={disabled}>
        {showOptions()}
      </Form.Select>
    </InputGroup>
  );
};

export default React.memo(PageSizeSelector);
