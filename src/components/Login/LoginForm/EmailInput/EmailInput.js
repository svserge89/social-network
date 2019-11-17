import React from 'react';
import { Form } from 'react-bootstrap';
import { Field } from 'redux-form';

import InputField from '../../../common/InputField/InputField';

const EmailInput = ({ name, validators }) => (
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Field type="email"
      placeholder="Enter email"
      name={name}
      component={InputField}
      validate={validators} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
);

export default EmailInput;