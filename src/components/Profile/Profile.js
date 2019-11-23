import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import {
  getProfile,
  getStatus,
  updateStatus,
  updatePhoto
} from '../../reducers/profile';
import AvatarCard from './AvatarCard/AvatarCard';
import InfoCard from './InfoCard/InfoCard';
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
  fetchingPhoto,
  status,
  getProfile,
  getStatus,
  updateStatus,
  updatePhoto,
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
            updateImage={updatePhoto}
            fetching={fetchingPhoto}
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
  profile: { profile, fetching, fetchingStatus, fetchingPhoto, status },
  auth: { userId }
}) => ({
  currentUserId: userId,
  ...profile,
  fetching,
  fetchingStatus,
  fetchingPhoto,
  status
});

export default compose(
  connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    updatePhoto
  }),
  withRouter
)(Profile);