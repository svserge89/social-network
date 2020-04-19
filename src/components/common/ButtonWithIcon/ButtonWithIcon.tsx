import React from 'react';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {ButtonWithIconProps} from './types';

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({children, icon, ...buttonProps}) => (
  <Button {...buttonProps}><FontAwesomeIcon icon={icon}/>&nbsp;{children}</Button>
);

export default ButtonWithIcon;
