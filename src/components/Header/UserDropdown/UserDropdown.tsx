import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';

import {UserDropdownProps} from './types';

const UserDropdown: React.FC<UserDropdownProps> = ({userName, logout, disabled = false}) => {
  const onClick = () => logout();

  return (
    <DropdownButton title={userName} variant="outline-light" id="user-dropdown" disabled={disabled}>
      <Dropdown.Item onClick={onClick}>Logout</Dropdown.Item>
    </DropdownButton>
  );
};

export default UserDropdown;