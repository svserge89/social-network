import React from 'react';
import {Form} from 'react-bootstrap';

const InputField = ({input, placeholder, type, meta: {touched, error}}) => (
  <>
    <Form.Control{...input} type={type} placeholder={placeholder} isInvalid={touched && error}/>
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </>
);

export default InputField;