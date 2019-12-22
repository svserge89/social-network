import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {authenticatedSelector} from '../../selectors/authSelectors';
import {LOGIN, PROFILE} from '../../utils/routes';

const Home = ({authenticated}) => (
  <Redirect to={authenticated ? PROFILE : LOGIN}/>
);

const mapStateToProps = (state) => ({authenticated: authenticatedSelector(state)});

export default compose(connect(mapStateToProps))(Home);