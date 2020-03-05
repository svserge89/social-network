import {Validator} from 'redux-form';

export type PasswordInputProps = {
  name: string
  validators?: Validator | Validator[]
  disabled?: boolean
}