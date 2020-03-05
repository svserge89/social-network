import React from 'react';
import {Form} from 'react-bootstrap';
import {Field} from 'redux-form';

import InputField from '../../../common/InputField/InputField';
import {EmailInputProps} from './types';

const EmailInput: React.FC<EmailInputProps> = ({name, validators, disabled = false}) => (
  <Form.Group>
    <Form.Label column={false}>Email address</Form.Label>
    <Field type="email"
           placeholder="Enter email"
           name={name}
           component={InputField}
           validate={validators}
           disabled={disabled}/>
    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
  </Form.Group>
);

export default EmailInput;