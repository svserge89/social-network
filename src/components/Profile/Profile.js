import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import {getProfile, cleanProfile, getStatus} from '../../reducers/profile/thunks';
import {userIdSelector as currentUserIdSelector} from '../../selectors/authSelectors';
import {fetchingSelector, userIdSelector} from '../../selectors/profileSelectors';
import {LOGIN} from '../../utils/routes';
import AvatarCard from './AvatarCard/AvatarCard';
import InfoCard from './InfoCard/InfoCard';
import ComponentLoader from '../common/ComponentLoader/ComponentLoader';

const Profile = ({
                   currentUserId,
                   userId,
                   fetching,
                   getProfile,
                   getStatus,
                   cleanProfile,
                   match: {params}
                 }) => {
  useEffect(() => {
    const id = params.userId ? params.userId : currentUserId;

    if (id) {
      getProfile(id);
      getStatus(id);
    }
  }, [params.userId, currentUserId, getProfile, getStatus]);

  useEffect(() => () => cleanProfile(), [cleanProfile]);

  if (!params.userId && !currentUserId) return (<Redirect to={LOGIN}/>);

  if (fetching || !userId) return (
    <Row className="mt-3"><Col className="col-12 p-0"><ComponentLoader/></Col></Row>
  );

  const isCurrentUser = () => (
    (currentUserId && !params.userId) || (currentUserId === params.userId)
  );

  return (
    <Row>
      <Col className="col-12 p-0 mt-3">
        <div className="d-flex">
          <AvatarCard editable={isCurrentUser()}/>
          <InfoCard editable={isCurrentUser()}/>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  currentUserId: currentUserIdSelector(state),
  userId: userIdSelector(state),
  fetching: fetchingSelector(state)
});

export default compose(
  connect(mapStateToProps, {getProfile, getStatus, cleanProfile}), withRouter
)(Profile);