import React from 'react';
import {Field} from 'react-final-form';
import {Form} from 'react-bootstrap';

import {RememberMeCheckboxProps} from './types';

const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({name, disabled}) => (
  <Form.Group>
    <Field name={name} type="checkbox">
      {() => (<Form.Check type="checkbox" label="Remember me" name={name} disabled={disabled}/>)}
    </Field>
  </Form.Group>
);

export default RememberMeCheckbox;
