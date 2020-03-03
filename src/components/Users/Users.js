import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {getUsers, cleanUsers, follow, unfollow} from '../../reducers/users/thunks';
import {setPage, setSize} from '../../reducers/users/actionCreators';
import {
  selectAvailable,
  selectFetching,
  selectFollowing,
  selectPage,
  selectSize,
  selectTotal,
  selectUsers
} from '../../selectors/users';
import UserCard from './UserCard/UserCard';
import PageNavToolbar from '../common/PageNavToolbar/PageNavToolbar';
import ComponentLoader from '../common/ComponentLoader/ComponentLoader';
import {selectUserId} from '../../selectors/auth';

const Users = ({
                 currentUserId,
                 users,
                 size,
                 total,
                 page,
                 fetching,
                 following,
                 available,
                 setPage,
                 setSize,
                 getUsers,
                 cleanUsers,
                 follow,
                 unfollow
               }) => {
  useEffect(() => {
    getUsers(page, size);
  }, [getUsers, page, size]);

  useEffect(() => () => cleanUsers(), [cleanUsers]);

  const isFollowing = (userId) => following.includes(userId);

  const showUserCards = () => {
    if (fetching || !users) return (
      <Row><Col className="col-12 p-0"><ComponentLoader/></Col></Row>
    );

    return (
      users.map(({id, name, status, photos: {small}, followed}) => (
        <Row key={id} className="mb-1">
          <Col className="col-12 p-0">
            <UserCard userId={id}
                      name={name}
                      status={status}
                      image={small}
                      followed={followed}
                      following={isFollowing(id)}
                      currentUserId={currentUserId}
                      follow={follow}
                      unfollow={unfollow}/>
          </Col>
        </Row>
      ))
    );
  };

  return (
    <>
      <Row>
        <Col className="col-12 p-0 mb-3">
          <PageNavToolbar total={total}
                          size={size}
                          page={page}
                          setPage={setPage}
                          setSize={setSize}
                          available={available}
                          fetching={fetching}/>
        </Col>
      </Row>
      {showUserCards()}
    </>
  )
};

const mapStateToProps = (state) => ({
  currentUserId: selectUserId(state),
  users: selectUsers(state),
  size: selectSize(state),
  total: selectTotal(state),
  page: selectPage(state),
  fetching: selectFetching(state),
  following: selectFollowing(state),
  available: selectAvailable(state)
});

export default compose(
  connect(mapStateToProps, {setPage, setSize, getUsers, cleanUsers, follow, unfollow})
)(Users);