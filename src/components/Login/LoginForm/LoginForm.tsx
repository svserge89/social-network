import React, {useEffect, useState} from 'react';
import {reduxForm} from 'redux-form';
import {Form, Button, Alert, ButtonToolbar} from 'react-bootstrap';

import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox/RememberMeCheckbox';
import CaptchaInput from './CapthaInput/CaptchaInput';
import ButtonLoader from '../../common/ButtonLoader/ButtonLoader';
import {required, isEmail, minLength, maxLength} from '../../../utils/validators';
import {LoginFormOwnProps, LoginFormProps} from './types';
import {LoginData} from '../../../models/types';

const minLength6 = minLength(6);
const maxLength50 = maxLength(50);

const LoginForm: React.FC<LoginFormProps> = ({handleSubmit, error, reset, updating, captcha}) => {
  const [localError, setLocalError] = useState(error);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error, setLocalError]);

  const showAlert = (): JSX.Element | '' => (
    localError ? (<Alert variant="danger">{localError}</Alert>) : ''
  );

  const showCaptcha = (): JSX.Element | '' => (
    captcha
      ? (
        <CaptchaInput name="captcha" url={captcha}
                      validators={[required]}
                      disabled={updating}/>
      )
      : ''
  );

  const showLogInButton = (): JSX.Element => (
    updating ? (<ButtonLoader/>) : (<Button variant="success" type="submit">Log In</Button>)
  );

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert()}
      <EmailInput name="email"
                  validators={[required, isEmail, maxLength50]}
                  disabled={updating}/>
      <PasswordInput name="password"
                     validators={[required, minLength6, maxLength50]}
                     disabled={updating}/>
      <RememberMeCheckbox name="rememberMe" disabled={updating}/>
      {showCaptcha()}
      <ButtonToolbar className="justify-content-between">
        {showLogInButton()}
        <Button variant="warning" type="reset" onClick={reset} disabled={updating}>Clean</Button>
      </ButtonToolbar>
    </Form>
  );
};

const formContainer = reduxForm<LoginData, LoginFormOwnProps>({form: 'login'});

export default formContainer(LoginForm);
