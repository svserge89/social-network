import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {logout} from '../../reducers/auth/thunks';
import {
  selectAuthenticated,
  selectLoading,
  selectLogin,
} from '../../selectors/auth';
import {selectIsError} from '../../selectors/error';
import {CHAT, HOME, LOGIN, PROFILE, USERS} from '../../utils/routes';
import LoginLink from './LoginLink/LoginLink';
import UserDropdown from './UserDropdown/UserDropdown';
import Layout from '../Layout/Layout';
import ButtonLoader from '../common/ButtonLoader/ButtonLoader';

const Header: React.FC = () => {
  const authenticated = useSelector(selectAuthenticated);
  const login = useSelector(selectLogin);
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectIsError);

  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => dispatch(logout()), [dispatch]);

  const showLogin = (): JSX.Element =>
    loading ? (
      <ButtonLoader outline={true} />
    ) : authenticated ? (
      <UserDropdown
        userName={login}
        logout={logoutHandler}
        disabled={isError}
      />
    ) : (
      <LoginLink path={LOGIN} disabled={isError} />
    );

  const showPrivateLink = (to: string, label: string): JSX.Element | '' =>
    authenticated ? (
      <LinkContainer to={to}>
        <Nav.Link active={false} disabled={isError}>
          {label}
        </Nav.Link>
      </LinkContainer>
    ) : (
      ''
    );

  return (
    <Navbar bg="primary" variant="dark" className="p-0">
      <Layout className="bg-primary p-2">
        <LinkContainer to={HOME}>
          <Navbar.Brand>Social Network</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {showPrivateLink(PROFILE, 'Profile')}
            <LinkContainer to={USERS}>
              <Nav.Link active={false} disabled={isError}>
                Users
              </Nav.Link>
            </LinkContainer>
            {showPrivateLink(CHAT, 'Chat')}
          </Nav>
          <Nav>{showLogin()}</Nav>
        </Navbar.Collapse>
      </Layout>
    </Navbar>
  );
};

export default React.memo(Header);
