import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Home = ({userId}) => (
  <Redirect to={userId ? "/profile" : "/login"}/>
);

const mapStateToProps = ({auth: userId}) => ({userId});

export default compose(connect(mapStateToProps))(Home);