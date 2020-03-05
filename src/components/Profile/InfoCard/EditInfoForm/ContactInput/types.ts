import {Validator} from 'redux-form';

export type ContactInputProps = {
  label: string
  placeholder: string
  name: string
  validators?: Validator | Validator[]
  disabled?: boolean
}