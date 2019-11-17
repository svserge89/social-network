import React, { useState, useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { Form, Button, Alert } from 'react-bootstrap';

import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox/RememberMeCheckbox';
import { required, isEmail, minLength, maxLength } from '../../../utils/validators';

const minLength6 = minLength(6);
const maxLength50 = maxLength(50);

const LoginForm = ({ handleSubmit, error }) => {
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    if (error) setErrorMessage(error);
  }, [error, setErrorMessage]);

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <EmailInput name="email"
        validators={[required, isEmail, maxLength50]} />
      <PasswordInput name="password"
        validators={[required, minLength6, maxLength50]} />
      <RememberMeCheckbox name="rememberMe" />
      <Button variant="primary" type="submit">Log In</Button>
    </Form>
  );
};

export default compose(
  reduxForm({ form: 'login' })
)(LoginForm);