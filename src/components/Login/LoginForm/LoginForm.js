import React, { useState, useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { Form, Button, Alert, ButtonToolbar } from 'react-bootstrap';

import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox/RememberMeCheckbox';
import {
  required,
  isEmail,
  minLength,
  maxLength
} from '../../../utils/validators';

const minLength6 = minLength(6);
const maxLength50 = maxLength(50);

const LoginForm = ({ handleSubmit, error, reset }) => {
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    if (error) setErrorMessage(error);
  }, [error, setErrorMessage]);

  const showAlert = () => (
    errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)
  );

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert()}
      <EmailInput
        name="email"
        validators={[required, isEmail, maxLength50]}
      />
      <PasswordInput
        name="password"
        validators={[required, minLength6, maxLength50]}
      />
      <RememberMeCheckbox name="rememberMe" />
      <ButtonToolbar className="justify-content-between">
        <Button variant="success" type="submit">Log In</Button>
        <Button variant="primary" type="reset" onClick={reset}>Clean</Button>
      </ButtonToolbar>
    </Form>
  );
};

export default compose(
  reduxForm({ form: 'login' })
)(LoginForm);