import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import LoginLink from './LoginLink/LoginLink';
import { logout } from '../../reducers/auth';
import UserDropdown from './UserDropdown/UserDropdown';

const Header = ({ login, logout }) => (
  <Navbar bg="primary" variant="dark">
    <Container>
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
          {login ? <UserDropdown userName={login} logout={logout} /> :
            <LoginLink path="/login" />}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const mapStateToProps = ({ auth: { userId, email, login, fetching } }) => ({
  userId,
  email,
  login,
  fetching
});

export default compose(
  connect(mapStateToProps, { logout })
)(Header);