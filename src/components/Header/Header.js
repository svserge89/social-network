import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {logout} from '../../reducers/auth';
import {authenticatedSelector, loadingSelector, loginSelector} from '../../selectors/authSelectors';
import {isErrorSelector} from '../../selectors/errorSelectors';
import {HOME, LOGIN, PROFILE, USERS} from '../../utils/routes';
import LoginLink from './LoginLink/LoginLink';
import UserDropdown from './UserDropdown/UserDropdown';
import Layout from '../Layout/Layout';
import ButtonLoader from '../common/ButtonLoader/ButtonLoader';

const Header = ({authenticated, login, logout, loading, isError}) => {
  const showLogin = () => (
    loading
      ? (<ButtonLoader outline={true}/>)
      : authenticated
      ? (<UserDropdown userName={login} logout={logout} disabled={isError}/>)
      : (<LoginLink path={LOGIN} disabled={isError}/>)
  );

  return (
    <Navbar bg="primary" variant="dark" className="p-0">
      <Layout className="bg-primary p-2">
        <LinkContainer to={HOME}><Navbar.Brand>Social Network</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to={PROFILE}>
              <Nav.Link active={false} disabled={isError}>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to={USERS}>
              <Nav.Link active={false} disabled={isError}>Users</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>{showLogin()}</Nav>
        </Navbar.Collapse>
      </Layout>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  authenticated: authenticatedSelector(state),
  login: loginSelector(state),
  loading: loadingSelector(state),
  isError: isErrorSelector(state)
});

export default compose(connect(mapStateToProps, {logout}))(Header);