import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import {getProfile, cleanProfile, getStatus} from '../../reducers/profile/thunks';
import {selectUserId as selectCurrentUserId} from '../../selectors/auth';
import {selectFetching, selectUserId} from '../../selectors/profile';
import {LOGIN} from '../../utils/routes';
import AvatarCard from './AvatarCard/AvatarCard';
import InfoCard from './InfoCard/InfoCard';
import ComponentLoader from '../common/ComponentLoader/ComponentLoader';
import {ProfileDispatchProps, ProfileOwnProps, ProfileProps, ProfileStateProps} from './types';
import {RootState} from '../../store/types';

const Profile: React.FC<ProfileProps> = ({
                                           currentUserId,
                                           userId,
                                           fetching,
                                           getProfile,
                                           getStatus,
                                           cleanProfile,
                                           match: {params}
                                         }) => {
  useEffect(() => {
    const id = Number(params.userId || currentUserId);

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
    (currentUserId && !params.userId) || (currentUserId === Number(params.userId))
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

const mapStateToProps = (state: RootState): ProfileStateProps => ({
  currentUserId: selectCurrentUserId(state),
  userId: selectUserId(state),
  fetching: selectFetching(state)
});

const stateContainer = connect<ProfileStateProps, ProfileDispatchProps, ProfileOwnProps, RootState>(
  mapStateToProps,
  {getProfile, getStatus, cleanProfile}
);

export default withRouter(stateContainer(Profile));