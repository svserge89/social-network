import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {logout} from '../../reducers/auth';
import LoginLink from './LoginLink/LoginLink';
import UserDropdown from './UserDropdown/UserDropdown';
import Layout from '../Layout/Layout';
import ButtonLoader from '../common/ButtonLoader/ButtonLoader';

const Header = ({login, logout, fetching, updating}) => {
  const showLogin = () => (
    fetching || updating
      ? (<ButtonLoader outline={true}/>)
      : login ? (<UserDropdown userName={login} logout={logout}/>) : (<LoginLink path="/login"/>)
  );

  return (
    <Navbar bg="primary" variant="dark" className="p-0">
      <Layout className="bg-primary p-2">
        <LinkContainer to="/"><Navbar.Brand>Social Network</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/profile"><Nav.Link active={false}>Profile</Nav.Link></LinkContainer>
            <LinkContainer to="/users"><Nav.Link active={false}>Users</Nav.Link></LinkContainer>
          </Nav>
          <Nav>{showLogin()}</Nav>
        </Navbar.Collapse>
      </Layout>
    </Navbar>
  );
};

const mapStateToProps = ({auth: {userId, email, login, fetching, updating}}) => ({
  userId,
  email,
  login,
  fetching,
  updating
});

export default compose(connect(mapStateToProps, {logout}))(Header);