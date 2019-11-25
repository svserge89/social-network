import React from 'react';
import {Form, InputGroup} from 'react-bootstrap';

const PageSizeSelector = ({available, current, change, disabled, size = "sm"}) => {
  const onChange = ({target: {value}}) => change(+value);

  const showOptions = () => available.map(value => (<option key={value}>{value}</option>));

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