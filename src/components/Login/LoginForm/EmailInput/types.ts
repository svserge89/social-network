import {FieldValidator} from 'final-form';

export type EmailInputProps = {
  name: string
  validators?: FieldValidator<string> | FieldValidator<string>[]
  disabled?: boolean
}
