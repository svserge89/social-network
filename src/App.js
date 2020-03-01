import React, {useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {initialization} from './reducers/init';
import {initializedSelector} from './selectors/initSelectors';
import {
  errorCodeSelector,
  errorDescriptionSelector,
  isErrorSelector
} from './selectors/errorSelectors';
import {HOME, LOGIN, PROFILE, USERS} from './utils/routes';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NotMatch from './components/NotMatch/NotMatch';
import Profile from './components/Profile/Profile';
import Users from './components/Users/Users';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Error from './components/Error/Error';
import PageLoader from './components/common/PageLoader/PageLoader';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({initialized, initialization, isError, errorCode, errorDescription}) => {
  useEffect(() => {
    initialization();
  }, [initialization]);

  if (!initialized && !isError) return (<PageLoader/>);

  const showComponent = () => {
    if (isError) return (<Error code={errorCode} description={errorDescription}/>);

    return (
      <Switch>
        <Route exact path={HOME} component={Home}/>
        <Route path={`${PROFILE}/:userId?`} component={Profile}/>
        <Route exact path={USERS} component={Users}/>
        <Route exact path={LOGIN} component={Login}/>
        <Route component={NotMatch}/>
      </Switch>
    );
  };

  return (
    <>
      <Header/>
      <Layout>
        <div className="px-2">
          {showComponent()}
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialized: initializedSelector(state),
  isError: isErrorSelector(state),
  errorCode: errorCodeSelector(state),
  errorDescription: errorDescriptionSelector(state)
});

export default compose(connect(mapStateToProps, {initialization}), withRouter)(App);