import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {LOGIN, PROFILE} from '../../utils/routes';

const Home = ({userId}) => (
  <Redirect to={userId ? PROFILE : LOGIN}/>
);

const mapStateToProps = ({auth: userId}) => ({userId});

export default compose(connect(mapStateToProps))(Home);