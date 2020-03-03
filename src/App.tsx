import React, {useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {initialization} from './reducers/init/thunks';
import {selectInitialized} from './selectors/init';
import {
  selectErrorCode,
  selectErrorDescription,
  selectIsError
} from './selectors/error';
import {RootState} from './store/types';
import {HOME, LOGIN, PROFILE, USERS} from './utils/routes';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NotMatch from './components/NotMatch/NotMatch';
import Profile from './components/Profile/Profile';
import Users from './components/Users/Users';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Error from './components/Error/Error';
import PageLoader from './components/common/PageLoader/PageLoader';

import 'bootstrap/dist/css/bootstrap.min.css';

type AppProps = {
  initialized: boolean
  initialization: () => void
  isError: boolean
  errorCode: number
  errorDescription: string
}

const App: React.FC<AppProps> = ({
                                   initialized,
                                   initialization,
                                   isError,
                                   errorCode,
                                   errorDescription
                                 }) => {
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
      <Layout className="flex-fill">
        <div className="px-2">
          {showComponent()}
        </div>
      </Layout>
      <Footer/>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  initialized: selectInitialized(state),
  isError: selectIsError(state),
  errorCode: selectErrorCode(state),
  errorDescription: selectErrorDescription(state)
});

export default compose(connect(mapStateToProps, {initialization}), withRouter)(App);