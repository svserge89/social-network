import {FieldValidator} from 'final-form';
import {FontAwesomeIconProps} from '@fortawesome/react-fontawesome';

export type ContactInputProps = {
  label: string;
  placeholder: string;
  name: string;
  icon: FontAwesomeIconProps['icon'];
  validators?: FieldValidator<string> | FieldValidator<string>[];
  disabled?: boolean;
};
