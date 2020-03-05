import {InjectedFormProps, Validator} from 'redux-form';

export type LookingForAJobInputProps = {
  checkboxName: string
  textareaName: string
  checked: boolean
  change: InjectedFormProps['change']
  validators?: Validator | Validator[]
  disabled?: boolean
}