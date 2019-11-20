import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';

import { login } from '../../reducers/auth';
import LoginForm from './LoginForm/LoginForm';

const Login = ({ userId, login }) => {
  if (userId) return (<Redirect to="/profile" />);

  return (
    <Row className="mt-3">
      <Col className="col-12 px-0">
        <Card>
          <Card.Header><h5>Login</h5></Card.Header>
          <Card.Body>
            <LoginForm onSubmit={login} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ auth: { userId } }) => ({ userId });

export default compose(
  connect(mapStateToProps, { login })
)(Login);