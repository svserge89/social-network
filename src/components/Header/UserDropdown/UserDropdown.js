import React from 'react';
import { NavDropdown } from 'react-bootstrap';

const UserDropdown = ({ userName, logout }) => {
  const onClick = () => logout();

  return (
    <NavDropdown title={userName} id="basic-nav-dropdown">
      <NavDropdown.Item onClick={onClick} >Logout</NavDropdown.Item>
    </NavDropdown>
  );
};

export default UserDropdown;