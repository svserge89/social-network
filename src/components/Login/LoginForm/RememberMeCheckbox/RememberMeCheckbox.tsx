import React from 'react';
import {Form} from 'react-bootstrap';
import {Field} from 'redux-form';

import {RememberMeCheckboxProps} from './types';

const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({name, disabled}) => (
  <Form.Group>
    <Field type="checkbox"
           label="Remember me"
           name={name}
           component={Form.Check}
           disabled={disabled}/>
  </Form.Group>
);

export default RememberMeCheckbox;