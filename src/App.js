import React, {useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {initialization} from './reducers/init';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NotMatch from './components/NotMatch/NotMatch';
import Profile from './components/Profile/Profile';
import Users from './components/Users/Users';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import PageLoader from './components/common/PageLoader/PageLoader';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({initialized, initialization}) => {
  useEffect(() => {
    initialization();
  }, [initialization]);

  if (!initialized) return (<PageLoader/>);

  return (
    <>
      <Header/>
      <Layout>
        <div className="px-2">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/profile/:userId?" component={Profile}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/login" component={Login}/>
            <Route component={NotMatch}/>
          </Switch>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = ({init: {initialized}}) => ({initialized});

export default compose(connect(mapStateToProps, {initialization}), withRouter)(App);