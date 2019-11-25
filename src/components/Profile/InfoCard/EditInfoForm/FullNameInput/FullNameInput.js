import React from 'react';
import {Form} from 'react-bootstrap';
import {Field} from 'redux-form';

import InputField from '../../../../common/InputField/InputField';

const FullNameInput = ({name, validators}) => (
  <Form.Group>
    <Form.Label column={false}><h5>Full Name</h5></Form.Label>
    <Field type="text"
           placeholder="Enter full name"
           name={name}
           component={InputField}
           validate={validators}/>
  </Form.Group>
);

export default FullNameInput;