import React from 'react';
import {Button, Spinner} from 'react-bootstrap';

const ButtonLoader = ({size, outline}) => (
  <Button variant={outline ? "outline-info" : "info"} disabled size={size}>
    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
    <span className="text-white ml-1">Loading...</span>
  </Button>
);

export default ButtonLoader;