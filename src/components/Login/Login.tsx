import React from 'react';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Card, Row, Col} from 'react-bootstrap';

import {login} from '../../reducers/auth/thunks';
import {
  selectAuthenticated,
  selectCaptcha,
  selectUpdating
} from '../../selectors/auth';
import {PROFILE} from '../../utils/routes';
import LoginForm from './LoginForm/LoginForm';
import {LoginDispatchProps, LoginOwnProps, LoginProps, LoginStateProps} from './types';
import {LoginData} from '../../models/types';
import {RootState} from '../../store/types';

const Login: React.FC<LoginProps> = ({authenticated, updating, login, captcha}) => {
  if (authenticated) return (<Redirect to={PROFILE}/>);

  const onSubmit = (data: LoginData) => {
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

const mapStateToProps = (state: RootState): LoginStateProps => ({
  authenticated: selectAuthenticated(state),
  updating: selectUpdating(state),
  captcha: selectCaptcha(state)
});

export default compose(
  connect<LoginStateProps, LoginDispatchProps, LoginOwnProps, RootState>(mapStateToProps, {login})
)(Login);