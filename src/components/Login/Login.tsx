import React, {useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Row, Col} from 'react-bootstrap';
import {FormErrors} from 'redux-form';

import {login} from '../../reducers/auth/thunks';
import {selectAuthenticated, selectCaptcha, selectUpdating} from '../../selectors/auth';
import {PROFILE} from '../../utils/routes';
import LoginForm from './LoginForm/LoginForm';
import {LoginData} from '../../models/types';

const Login: React.FC = () => {
  const authenticated = useSelector(selectAuthenticated);
  const updating = useSelector(selectUpdating);
  const captcha = useSelector(selectCaptcha);

  const dispatch = useDispatch();

  const handleLogin = useCallback(
    (loginData: LoginData): FormErrors => dispatch(login(loginData)),
    [dispatch]
  );

  if (authenticated) return (<Redirect to={PROFILE}/>);

  return (
    <Row className="mt-3">
      <Col className="col-12 px-0">
        <Card>
          <Card.Header><h5>Login</h5></Card.Header>
          <Card.Body>
            <LoginForm onSubmit={handleLogin} updating={updating} captcha={captcha}/>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
