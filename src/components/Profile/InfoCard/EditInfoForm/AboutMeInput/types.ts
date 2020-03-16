import {FieldValidator} from 'final-form';

export type AboutMeInputProps = {
  name: string
  validators?: FieldValidator<string> | FieldValidator<string>[]
  disabled?: boolean
}
