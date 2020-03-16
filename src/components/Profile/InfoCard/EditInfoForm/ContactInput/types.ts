import {FieldValidator} from 'final-form';

export type ContactInputProps = {
  label: string
  placeholder: string
  name: string
  validators?: FieldValidator<string> | FieldValidator<string>[]
  disabled?: boolean
}
