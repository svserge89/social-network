import {FieldValidator} from 'final-form';

export type FullNameInputProps = {
  name: string;
  validators?: FieldValidator<string> | FieldValidator<string>[];
  disabled?: boolean;
};
