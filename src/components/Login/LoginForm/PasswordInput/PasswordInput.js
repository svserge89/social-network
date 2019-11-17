import React from 'react';
import { Form } from 'react-bootstrap';
import { Field } from 'redux-form';

import InputField from '../../../common/InputField/InputField';

const PasswordInput = ({ name, validators, error }) => (
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Field type="password"
      placeholder="Password"
      name={name}
      component={InputField}
      validate={validators} />
  </Form.Group>
);

export default PasswordInput;