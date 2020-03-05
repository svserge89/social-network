import {Validator} from 'redux-form';

export type EmailInputProps = {
  name: string
  validators?: Validator | Validator[]
  disabled?: boolean
}