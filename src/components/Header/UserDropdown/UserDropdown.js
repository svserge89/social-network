import React from 'react';
import { NavDropdown } from 'react-bootstrap';

const UserDropdown = ({ userName, logout }) => (
  <NavDropdown title={userName} id="basic-nav-dropdown">
    <NavDropdown.Item onClick={() => logout()} >Logout</NavDropdown.Item>
  </NavDropdown>
);

export default UserDropdown;