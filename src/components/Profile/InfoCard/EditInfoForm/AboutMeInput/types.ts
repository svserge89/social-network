import {Validator} from 'redux-form';

export type AboutMeInputProps = {
  name: string
  validators?: Validator | Validator[]
  disabled?: boolean
}