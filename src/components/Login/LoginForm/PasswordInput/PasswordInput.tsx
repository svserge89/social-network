import React from 'react';
import {Form} from 'react-bootstrap';
import {Field} from 'redux-form';

import InputField from '../../../common/InputField/InputField';
import {PasswordInputProps} from './types';

const PasswordInput: React.FC<PasswordInputProps> = ({name, validators, disabled = false}) => (
  <Form.Group>
    <Form.Label column={false}>Password</Form.Label>
    <Field type="password"
           placeholder="Password"
           name={name}
           component={InputField}
           validate={validators}
           disabled={disabled}/>
  </Form.Group>
);

export default PasswordInput;