import React from 'react';
import {Form} from 'react-bootstrap';

import {InputFieldProps} from './types';

const InputField: React.FC<InputFieldProps> = ({
                                                 input,
                                                 placeholder,
                                                 disabled,
                                                 autoComplete,
                                                 type,
                                                 meta: {touched, error}
                                               }) => (
  <>
    <Form.Control
      {...input}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      isInvalid={touched && error}
      autoComplete={autoComplete}/>
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </>
);

export default InputField;