import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const ButtonLoader = () => (
  <Button variant="secondary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span>Loading...</span>
  </Button>
);

export default ButtonLoader;