import {FieldValidator} from 'final-form';

export type LookingForAJobInputProps = {
  checkboxName: string
  textareaName: string
  checked: boolean
  validators?: FieldValidator<string> | FieldValidator<string>[]
  disabled?: boolean
}
