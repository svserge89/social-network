import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {selectAuthenticated} from '../../selectors/auth';
import {LOGIN, PROFILE} from '../../utils/routes';

const Home: React.FC = () => {
  const authenticated = useSelector(selectAuthenticated);

  return (
    <Redirect to={authenticated ? PROFILE : LOGIN}/>
  );
};

export default Home;
