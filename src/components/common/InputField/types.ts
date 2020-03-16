import {FormControlProps} from 'react-bootstrap';
import {FieldInputProps, FieldMetaState} from 'react-final-form';

export type InputFieldProps = {
  input: FieldInputProps<string>
  meta: FieldMetaState<string>
  placeholder: string
  disabled?: FormControlProps['disabled']
  autoComplete: any
  type: FormControlProps['type']
}
