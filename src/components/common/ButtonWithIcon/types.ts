import {HTMLProps} from 'react';
import {ButtonProps} from 'react-bootstrap';
import {FontAwesomeIconProps} from '@fortawesome/react-fontawesome';

export type ButtonWithIconProps = ButtonProps & {
  icon: FontAwesomeIconProps['icon'];
  onClick?: HTMLProps<HTMLButtonElement>['onClick']
}
