import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {Redirect} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import {
  getProfile,
  cleanProfile,
  getStatus,
} from '../../reducers/profile/thunks';
import {selectUserId as selectCurrentUserId} from '../../selectors/auth';
import {selectFetching, selectUserId} from '../../selectors/profile';
import {LOGIN} from '../../utils/routes';
import AvatarCard from './AvatarCard/AvatarCard';
import InfoCard from './InfoCard/InfoCard';
import ComponentLoader from '../common/ComponentLoader/ComponentLoader';

const Profile: React.FC = () => {
  const currentUserId = useSelector(selectCurrentUserId);
  const userId = useSelector(selectUserId);
  const fetching = useSelector(selectFetching);
  const {userId: userIdParam} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const id = Number(userIdParam || currentUserId);

    if (id) {
      dispatch(getProfile(id));
      dispatch(getStatus(id));
    }
  }, [userIdParam, currentUserId, dispatch]);

  useEffect(
    () => () => {
      dispatch(cleanProfile());
    },
    [dispatch]
  );

  if (!userIdParam && !currentUserId) {
    return <Redirect to={LOGIN} />;
  }

  if (fetching || !userId) {
    return (
      <Row className="mt-3">
        <Col className="col-12 p-0">
          <ComponentLoader />
        </Col>
      </Row>
    );
  }

  const isCurrentUser =
    (currentUserId && !userIdParam) || currentUserId === Number(userIdParam);

  return (
    <Row>
      <Col className="col-12 p-0 mt-3">
        <div className="d-flex">
          <AvatarCard editable={isCurrentUser} />
          <InfoCard editable={isCurrentUser} />
        </div>
      </Col>
    </Row>
  );
};

export default Profile;
