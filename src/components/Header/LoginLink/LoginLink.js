import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';

const LoginLink = ({path}) => (
  <LinkContainer to={path}><Button variant="outline-light">Login</Button></LinkContainer>
);

export default LoginLink;