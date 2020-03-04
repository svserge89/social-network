import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {selectAuthenticated} from '../../selectors/auth';
import {LOGIN, PROFILE} from '../../utils/routes';
import {HomeDispatchProps, HomeOwnProps, HomeProps, HomeStateProps} from './types';
import {RootState} from '../../store/types';

const Home: React.FC<HomeProps> = ({authenticated}) => (
  <Redirect to={authenticated ? PROFILE : LOGIN}/>
);

const mapStateToProps = (state: RootState): HomeStateProps => ({
  authenticated: selectAuthenticated(state)
});

export default compose(
  connect<HomeStateProps, HomeDispatchProps, HomeOwnProps, RootState>(mapStateToProps)
)(Home);