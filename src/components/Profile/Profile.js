import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import {
  getProfile,
  updateProfile,
  cleanProfile,
  getStatus,
  updateStatus,
  updatePhoto
} from '../../reducers/profile';
import {LOGIN} from '../../utils/routes';
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
                   contactLabels,
                   fetching,
                   fetchingStatus,
                   fetchingPhoto,
                   status,
                   getProfile,
                   getStatus,
                   updateStatus,
                   updatePhoto,
                   updateProfile,
                   cleanProfile,
                   updating,
                   photos: {large},
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
          <AvatarCard image={large}
                      editable={isCurrentUser()}
                      updateImage={updatePhoto}
                      fetching={fetchingPhoto}/>
          <InfoCard fullName={fullName}
                    status={status}
                    contacts={contacts}
                    aboutMe={aboutMe}
                    contactLabels={contactLabels}
                    lookingForAJob={lookingForAJob}
                    lookingForAJobDescription={lookingForAJobDescription}
                    setStatus={updateStatus}
                    fetchingStatus={fetchingStatus}
                    editable={isCurrentUser()}
                    updateProfile={updateProfile}
                    updating={updating}/>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({
                           profile: {
                             profile,
                             fetching,
                             fetchingStatus,
                             fetchingPhoto,
                             status,
                             contactLabels,
                             updating
                           },
                           auth: {userId}
                         }) => ({
  currentUserId: userId,
  ...profile,
  fetching,
  fetchingStatus,
  fetchingPhoto,
  status,
  contactLabels,
  updating
});

export default compose(
  connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    updatePhoto,
    updateProfile,
    cleanProfile
  }),
  withRouter
)(Profile);