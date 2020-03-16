import React from 'react';
import {Form as FinalForm} from 'react-final-form';
import {Form, Button, Alert, ButtonToolbar} from 'react-bootstrap';

import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox/RememberMeCheckbox';
import CaptchaInput from './CapthaInput/CaptchaInput';
import ButtonLoader from '../../common/ButtonLoader/ButtonLoader';
import {required, isEmail, minLength, maxLength} from '../../../utils/validators';
import {LoginFormProps} from './types';

const minLength6 = minLength(6);
const maxLength50 = maxLength(50);

const LoginForm: React.FC<LoginFormProps> = ({onSubmit, captcha}) => {
  const showAlert = (error: string): JSX.Element | '' => (
    error ? (<Alert variant="danger">{error}</Alert>) : ''
  );

  const showCaptcha = (updating: boolean): JSX.Element | '' => (
    captcha
      ? (
        <CaptchaInput name="captcha"
                      url={captcha}
                      validators={[required]}
                      disabled={updating}/>
      )
      : ''
  );

  const showLogInButton = (updating: boolean, disabled: boolean): JSX.Element => (
    updating
      ? (<ButtonLoader/>)
      : (<Button variant="success" type="submit" disabled={disabled}>Log In</Button>)
  );

  return (
    <FinalForm onSubmit={onSubmit}>
      {
        ({handleSubmit, pristine, form, submitError, submitting}) => (
          <Form onSubmit={handleSubmit}>
            {showAlert(submitError)}
            <EmailInput name="email"
                        validators={[required, isEmail, maxLength50]}
                        disabled={submitting}/>
            <PasswordInput name="password"
                           validators={[required, minLength6, maxLength50]}
                           disabled={submitting}/>
            <RememberMeCheckbox name="rememberMe" disabled={submitting}/>
            {showCaptcha(submitting)}
            <ButtonToolbar className="justify-content-between">
              {showLogInButton(submitting, pristine)}
              <Button variant="warning"
                      type="reset"
                      onClick={form.reset}
                      disabled={submitting || pristine}>
                Clean
              </Button>
            </ButtonToolbar>
          </Form>
        )
      }
    </FinalForm>
  );
};

export default LoginForm;
