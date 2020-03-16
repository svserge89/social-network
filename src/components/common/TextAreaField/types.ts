import {FormControlProps} from 'react-bootstrap';
import {FieldInputProps, FieldMetaState} from 'react-final-form';

export type TextAreaFieldProps = {
  input: FieldInputProps<string>
  meta: FieldMetaState<string>
  rows: number
  placeholder?: string
  disabled?: FormControlProps['disabled']
  type: FormControlProps['type']
}
