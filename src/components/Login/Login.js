import React from 'react';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Card, Row, Col} from 'react-bootstrap';

import {login} from '../../reducers/auth';
import {
  authenticatedSelector,
  captchaSelector,
  updatingSelector
} from '../../selectors/authSelectors';
import {PROFILE} from '../../utils/routes';
import LoginForm from './LoginForm/LoginForm';

const Login = ({authenticated, updating, login, captcha}) => {
  if (authenticated) return (<Redirect to={PROFILE}/>);

  const onSubmit = (data) => {
    login(data)
  };

  return (
    <Row className="mt-3">
      <Col className="col-12 px-0">
        <Card>
          <Card.Header><h5>Login</h5></Card.Header>
          <Card.Body>
            <LoginForm onSubmit={onSubmit} updating={updating} captcha={captcha}/>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  authenticated: authenticatedSelector(state),
  updating: updatingSelector(state),
  captcha: captchaSelector(state)
});

export default compose(connect(mapStateToProps, {login}))(Login);