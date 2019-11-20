import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import {
  setPage,
  setSize,
  getUsers,
  follow,
  unfollow
} from '../../reducers/users';
import Paginator from '../common/Paginator/Paginator';
import UserCard from './UserCard/UserCard';
import PageSizeSelector from './PageSizeSelector/PageSizeSelector';

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
  follow,
  unfollow
}) => {
  useEffect(() => {
    getUsers(page, size);
  }, [getUsers, page, size]);

  const isFollowing = (userId) => following.includes(userId);

  const showUserCards = () => (
    users.map(({ id, name, status, photos: { small }, followed }) => (
      <Row key={id} className="mb-1">
        <UserCard
          userId={id}
          name={name}
          status={status}
          image={small}
          followed={followed}
          following={isFollowing(id)}
          currentUserId={currentUserId}
          follow={follow}
          unfollow={unfollow}
        />
      </Row>
    ))
  );

  return (
    <>
      <Row className="mt-3">
        <Col className="px-0">
          <Paginator
            totalItems={total}
            pageSize={size}
            currentPage={page}
            setPage={setPage}
            sideLength={3}
          />
        </Col>
        <Col className="px-0 mb-3" xl={2} lg={2} md={3} sm={4}>
          <PageSizeSelector
            available={available}
            current={size}
            change={setSize}
          />
        </Col>
      </Row>
      {showUserCards()}
    </>
  )
};

const mapStateToProps = ({
  auth: { userId },
  users: { users, size, total, page, fetching, following, available }
}) => ({
  currentUserId: userId,
  users,
  size,
  total,
  page,
  fetching,
  following,
  available
});

export default compose(
  connect(mapStateToProps, {
    setPage,
    setSize,
    getUsers,
    follow,
    unfollow
  })
)(Users);