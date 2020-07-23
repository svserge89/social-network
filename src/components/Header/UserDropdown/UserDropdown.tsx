import React, {useCallback} from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import {faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';

import {UserDropdownProps} from './types';
import ComponentWithIcon from '../../common/ComponentWithIcon/ComponentWithIcon';

const UserDropdown: React.FC<UserDropdownProps> = ({
  userName,
  logout,
  disabled = false,
}) => {
  const onClick = useCallback(() => logout(), [logout]);

  const showTitle = (): JSX.Element => (
    <ComponentWithIcon icon={faUser}>{userName}</ComponentWithIcon>
  );

  return (
    <DropdownButton
      title={showTitle()}
      variant="outline-light"
      id="user-dropdown"
      disabled={disabled}
    >
      <Dropdown.Item onClick={onClick}>
        <ComponentWithIcon icon={faSignOutAlt}>Logout</ComponentWithIcon>
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default UserDropdown;
