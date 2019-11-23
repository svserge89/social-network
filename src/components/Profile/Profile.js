import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import AvatarCard from './AvatarCard/AvatarCard';
import InfoCard from './InfoCard/InfoCard';
import { getProfile, getStatus, updateStatus } from '../../reducers/profile';
import ComponentLoader from '../common/ComponentLoader/ComponentLoader';

const Profile = ({
  currentUserId,
  userId,
  contacts,
  lookingForAJob,
  lookingForAJobDescription,
  fullName,
  aboutMe,
  fetching,
  fetchingStatus,
  status,
  getProfile,
  getStatus,
  updateStatus,
  photos: { large },
  match: { params }
}) => {
  useEffect(() => {
    const id = params.userId ? params.userId : currentUserId;

    if (id) {
      getProfile(id);
      getStatus(id);
    }
  }, [params.userId, currentUserId, getProfile, getStatus]);

  if (fetching) return (
    <Row className="mt-3">
      <Col className="col-12 p-0">
        <ComponentLoader />
      </Col>
    </Row>
  );

  const isCurrentUser = () => (
    (currentUserId && !params.userId) || (currentUserId === params.userId)
  );

  return (
    <Row>
      <Col className="col-12 p-0 mt-3">
        <div className="d-flex">
          <AvatarCard
            className="flex-shrink-0 flex-grow-0"
            image={large}
            editable={isCurrentUser()}
          />
          <InfoCard
            fullName={fullName}
            status={status}
            contacts={contacts}
            lookingForAJob={lookingForAJob}
            lookingForAJobDescription={lookingForAJobDescription}
            aboutMe={aboutMe}
            setStatus={updateStatus}
            fetchingStatus={fetchingStatus}
            editableStatus={isCurrentUser()}
          />
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({
  profile: { profile, fetching, fetchingStatus, status },
  auth: { userId }
}) => ({
  currentUserId: userId,
  ...profile,
  fetching,
  fetchingStatus,
  status
});

export default compose(
  connect(mapStateToProps, { getProfile, getStatus, updateStatus }),
  withRouter
)(Profile);