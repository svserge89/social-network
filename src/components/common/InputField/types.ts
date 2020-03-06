import {FormControlProps} from 'react-bootstrap';
import {WrappedFieldProps} from 'redux-form';

type InputFieldOwnProps = {
  placeholder: string
  disabled?: FormControlProps['disabled']
  autoComplete: any
  type: FormControlProps['type']
}

export type InputFieldProps = WrappedFieldProps & InputFieldOwnProps