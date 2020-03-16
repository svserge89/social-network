import {FieldValidator} from 'final-form';

export type PasswordInputProps = {
  name: string
  validators?: FieldValidator<string> | FieldValidator<string>[]
  disabled?: boolean
}
