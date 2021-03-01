import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {ComponentWithIconProps} from './types';

const ComponentWithIcon: React.FC<ComponentWithIconProps> = ({
  icon,
  children,
}) => (
  <>
    <FontAwesomeIcon icon={icon} />
    {children && <>&nbsp;{children}</>}
  </>
);

export default ComponentWithIcon;
