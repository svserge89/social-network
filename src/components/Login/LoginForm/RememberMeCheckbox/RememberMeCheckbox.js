import React from 'react';
import {Form} from 'react-bootstrap';
import {Field} from 'redux-form';

const RememberMeCheckbox = ({name, disabled}) => (
  <Form.Group controlId="formBasicCheckbox">
    <Field type="checkbox"
           label="Remember me"
           name={name}
           component={Form.Check}
           disabled={disabled}/>
  </Form.Group>
);

export default RememberMeCheckbox;