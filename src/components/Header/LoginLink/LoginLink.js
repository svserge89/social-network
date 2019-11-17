import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

const LoginLink = ({ path }) => (
  <LinkContainer to={path}>
    <Nav.Link>Login</Nav.Link>
  </LinkContainer>
);

export default LoginLink;