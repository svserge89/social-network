import React, {useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Row, Col} from 'react-bootstrap';

import {login} from '../../reducers/auth/thunks';
import {selectAuthenticated, selectCaptcha} from '../../selectors/auth';
import {PROFILE} from '../../utils/routes';
import LoginForm from './LoginForm/LoginForm';
import {LoginData} from '../../models/types';

const Login: React.FC = () => {
  const authenticated = useSelector(selectAuthenticated);
  const captcha = useSelector(selectCaptcha);

  const dispatch = useDispatch();

  const handleLogin = useCallback(
    async (loginData: LoginData): Promise<any> => {
      try {
        await dispatch(login(loginData));
      } catch (error) {
        return error;
      }
    },
    [dispatch]
  );

  if (authenticated) {
    return <Redirect to={PROFILE} />;
  }

  return (
    <Row className="mt-3">
      <Col className="col-12 px-0">
        <Card>
          <Card.Header>
            <h5>Login</h5>
          </Card.Header>
          <Card.Body>
            <LoginForm onSubmit={handleLogin} captcha={captcha} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
