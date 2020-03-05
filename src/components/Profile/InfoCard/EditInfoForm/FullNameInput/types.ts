import {Validator} from 'redux-form';

export type FullNameInputProps = {
  name: string
  validators?: Validator | Validator[]
  disabled?: boolean
}