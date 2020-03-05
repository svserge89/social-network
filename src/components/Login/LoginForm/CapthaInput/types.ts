import {Validator} from 'redux-form';

export type CaptchaInputProps = {
  name: string
  url: string
  validators?: Validator | Validator[]
  disabled?: boolean
}