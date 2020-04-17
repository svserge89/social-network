import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {initialization} from './reducers/init/thunks';
import {selectInitialized} from './selectors/init';
import {
  selectErrorCode,
  selectErrorDescription,
  selectIsError
} from './selectors/error';
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

const App: React.FC = () => {
  const initialized = useSelector(selectInitialized);
  const isError = useSelector(selectIsError);
  const errorCode = useSelector(selectErrorCode);
  const errorDescription = useSelector(selectErrorDescription);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialization());
  }, [dispatch]);

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

export default App;
