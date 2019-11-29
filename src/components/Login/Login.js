import React from 'react';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Card, Row, Col} from 'react-bootstrap';

import {login} from '../../reducers/auth';
import LoginForm from './LoginForm/LoginForm';

const Login = ({userId, updating, login, captcha}) => {
  if (userId) return (<Redirect to="/profile"/>);

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

const mapStateToProps = ({auth: {userId, updating, captcha}}) => ({userId, updating, captcha});

export default compose(connect(mapStateToProps, {login}))(Login);