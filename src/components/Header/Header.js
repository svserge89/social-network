import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logout } from '../../reducers/auth';
import LoginLink from './LoginLink/LoginLink';
import UserDropdown from './UserDropdown/UserDropdown';
import Layout from '../Layout/Layout';

const Header = ({ login, logout }) => {
  const showLogin = () => (
    login ?
      (<UserDropdown userName={login} logout={logout} />) :
      (<LoginLink path="/login" />)
  );

  return (
    <Navbar bg="primary" variant="dark">
      <Layout>
        <LinkContainer to="/">
          <Navbar.Brand>Social Network</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {showLogin()}
          </Nav>
        </Navbar.Collapse>
      </Layout>
    </Navbar>
  );
};

const mapStateToProps = ({ auth: { userId, email, login, fetching } }) => ({
  userId,
  email,
  login,
  fetching
});

export default compose(
  connect(mapStateToProps, { logout })
)(Header);