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
import {HOME, LOGIN, PROFILE, USERS} from '../../utils/routes';
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

  return (
    <Navbar bg="primary" variant="dark" className="p-0">
      <Layout className="bg-primary p-2">
        <LinkContainer to={HOME}>
          <Navbar.Brand>Social Network</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to={PROFILE}>
              <Nav.Link active={false} disabled={isError}>
                Profile
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={USERS}>
              <Nav.Link active={false} disabled={isError}>
                Users
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>{showLogin()}</Nav>
        </Navbar.Collapse>
      </Layout>
    </Navbar>
  );
};

export default Header;
