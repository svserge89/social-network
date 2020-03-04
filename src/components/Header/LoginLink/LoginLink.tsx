import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';
import {LoginLinkProps} from './types';

const LoginLink: React.FC<LoginLinkProps> = ({path, disabled = false}) => (
  <LinkContainer to={path}>
    <Button variant="outline-light" disabled={disabled}>Login</Button>
  </LinkContainer>
);

export default LoginLink;