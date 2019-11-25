import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';

const UserDropdown = ({userName, logout}) => {
  const onClick = () => logout();

  return (
    <DropdownButton title={userName} variant="outline-light" id="user-dropdown">
      <Dropdown.Item onClick={onClick}>Logout</Dropdown.Item>
    </DropdownButton>
  );
};

export default UserDropdown;