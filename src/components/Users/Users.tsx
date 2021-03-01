import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Row} from 'react-bootstrap';

import {
  cleanUsers,
  follow,
  getUsers,
  unfollow,
} from '../../reducers/users/thunks';
import {
  selectAvailable,
  selectFetching,
  selectFollowing,
  selectTotal,
  selectUsers,
} from '../../selectors/users';
import {useUsersQueryParams} from '../../hooks/users-query-params';
import {selectAuthenticated, selectUserId} from '../../selectors/auth';
import UserCard from './UserCard/UserCard';
import PageNavToolbar from '../common/PageNavToolbar/PageNavToolbar';
import ComponentLoader from '../common/ComponentLoader/ComponentLoader';
import FilterToolbar from './FilterToolbar/FilterToolbar';
import {Relation} from '../../hooks/types';

const Users: React.FC = () => {
  const currentUserId = useSelector(selectUserId);
  const users = useSelector(selectUsers);
  const total = useSelector(selectTotal);
  const fetching = useSelector(selectFetching);
  const following = useSelector(selectFollowing);
  const available = useSelector(selectAvailable).map((value) =>
    value.toString()
  );
  const authenticated = useSelector(selectAuthenticated);

  const dispatch = useDispatch();

  const {
    page,
    size,
    filter,
    relation,
    setPage,
    setSize,
    setFilter,
    setRelation,
  } = useUsersQueryParams();

  useEffect(() => {
    dispatch(getUsers(page, size, relation, filter));
  }, [dispatch, page, size, relation, filter]);

  useEffect(
    () => () => {
      dispatch(cleanUsers());
    },
    [dispatch]
  );

  const isFollowing = useCallback(
    (userId: number): boolean => following.includes(userId),
    [following]
  );

  const followHandler = useCallback((userId) => dispatch(follow(userId)), [
    dispatch,
  ]);

  const unfollowHandler = useCallback((userId) => dispatch(unfollow(userId)), [
    dispatch,
  ]);

  const setPageHandler = useCallback(
    (page: number) => {
      setPage(page);
    },
    [setPage]
  );

  const setSizeHandler = useCallback(
    (size: number) => {
      setSize(size);
    },
    [setSize]
  );

  const setRelationHandler = useCallback(
    (relation: Relation) => {
      setRelation(relation);
    },
    [setRelation]
  );

  const setFilterHandler = useCallback(
    (filter) => {
      setFilter(filter);
    },
    [setFilter]
  );

  const showUserCards = (): JSX.Element | JSX.Element[] => {
    if (fetching || !users) {
      return <ComponentLoader />;
    }

    if (!users.length) {
      return (
        <h4 className="d-flex justify-content-center text-secondary">
          No users...
        </h4>
      );
    }

    return users.map(({id, name, status, photos: {small}, followed}) => (
      <Row key={id} className="mb-1">
        <Col className="col-12 p-0">
          <UserCard
            userId={id}
            name={name}
            status={status || ''}
            image={small}
            followed={followed}
            following={isFollowing(id)}
            currentUserId={currentUserId}
            follow={followHandler}
            unfollow={unfollowHandler}
          />
        </Col>
      </Row>
    ));
  };

  return (
    <>
      <Row>
        <Col className="col-12 p-0">
          <FilterToolbar
            relation={relation}
            filter={filter}
            setFilter={setFilterHandler}
            setRelation={setRelationHandler}
            filterOnly={!authenticated}
            fetching={fetching}
          />
        </Col>
      </Row>
      <Row>
        <Col className="col-12 p-0 mb-3">
          <PageNavToolbar
            total={total}
            size={size}
            page={page}
            setPage={setPageHandler}
            setSize={setSizeHandler}
            available={available}
            fetching={fetching}
          />
        </Col>
      </Row>
      {showUserCards()}
    </>
  );
};

export default Users;
