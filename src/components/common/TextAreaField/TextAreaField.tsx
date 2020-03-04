import React from 'react';
import {Form} from 'react-bootstrap';

import {TextAreaFieldProps} from './types';

const TextAreaField: React.FC<TextAreaFieldProps> = ({
                                                       input,
                                                       placeholder,
                                                       type,
                                                       meta: {touched, error},
                                                       rows,
                                                       disabled = false
                                                     }) => (
  <>
    <Form.Control as="textarea"
                  rows={rows}
                  {...input}
                  type={type}
                  placeholder={placeholder}
                  isInvalid={touched && error}
                  disabled={disabled}/>
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </>
);

export default TextAreaField;

