import React from 'react';
import {Form} from 'react-bootstrap';

const TextAreaField = ({input, placeholder, type, meta: {touched, error}, rows, disabled}) => (
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

