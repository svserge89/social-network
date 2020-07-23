import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';

import {LoginLinkProps} from './types';
import ButtonWithIcon from '../../common/ButtonWithIcon/ButtonWithIcon';

const LoginLink: React.FC<LoginLinkProps> = ({path, disabled = false}) => (
  <LinkContainer to={path}>
    <ButtonWithIcon
      variant="outline-light"
      icon={faSignInAlt}
      disabled={disabled}
    >
      Login
    </ButtonWithIcon>
  </LinkContainer>
);

export default LoginLink;
