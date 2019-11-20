import React from 'react';
import { Form } from 'react-bootstrap';
import { Field } from 'redux-form';

const RememberMeCheckbox = ({ name }) => (
  <Form.Group controlId="formBasicCheckbox">
    <Field
      type="checkbox"
      label="Remember me"
      name={name}
      component={Form.Check}
    />
  </Form.Group>
);

export default RememberMeCheckbox;