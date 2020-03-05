import React from 'react';
import {Form, InputGroup} from 'react-bootstrap';

import {PageSizeSelectorProps} from './types';

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
                                                             available,
                                                             current,
                                                             change,
                                                             disabled,
                                                             size = 'sm'
                                                           }) => {
  const onChange = ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) => change(+value);

  const showOptions = (): Array<JSX.Element> => available.map(
    value => (<option key={value}>{value}</option>)
  );

  return (
    <InputGroup size={size}>
      <InputGroup.Prepend><InputGroup.Text>Page size</InputGroup.Text></InputGroup.Prepend>
      <Form.Control onChange={onChange} as="select" value={current} disabled={disabled}>
        {showOptions()}
      </Form.Control>
    </InputGroup>
  );
};

export default PageSizeSelector;