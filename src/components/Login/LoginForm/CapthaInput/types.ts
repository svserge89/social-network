import {FieldValidator} from 'final-form';

export type CaptchaInputProps = {
  name: string;
  url: string;
  validators?: FieldValidator<string> | FieldValidator<string>[];
  disabled?: boolean;
};
