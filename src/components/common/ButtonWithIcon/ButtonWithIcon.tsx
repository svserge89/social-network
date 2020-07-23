import React from 'react';
import {Button} from 'react-bootstrap';

import {ButtonWithIconProps} from './types';
import ComponentWithIcon from '../ComponentWithIcon/ComponentWithIcon';

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  children,
  icon,
  ...buttonProps
}) => (
  <Button {...buttonProps}>
    <ComponentWithIcon icon={icon}>{children}</ComponentWithIcon>
  </Button>
);

export default ButtonWithIcon;
