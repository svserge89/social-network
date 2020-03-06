import {FormControlProps} from 'react-bootstrap';
import {WrappedFieldProps} from 'redux-form';

type TextAreaFieldOwnProps = {
  rows: number
  placeholder: string
  disabled?: FormControlProps['disabled']
  type: FormControlProps['type']
}

export type TextAreaFieldProps = TextAreaFieldOwnProps & WrappedFieldProps
