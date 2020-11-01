import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StringParam, useQueryParam} from 'use-query-params';
import {Col, Row} from 'react-bootstrap';

import {
  cleanUsers,
  follow,
  getUsers,
  unfollow,
} from '../../reducers/users/thunks';
import {
  setFilter,
  setPage,
  setRelation,
  setSize,
} from '../../reducers/users/action-creators';
import {
  selectAvailable,
  selectFetching,
  selectFilter,
  selectFollowing,
  selectPage,
  selectRelation,
  selectSize,
  selectTotal,
  selectUsers,
} from '../../selectors/users';
import {selectAuthenticated, selectUserId} from '../../selectors/auth';
import UserCard from './UserCard/UserCard';
import PageNavToolbar from '../common/PageNavToolbar/PageNavToolbar';
import ComponentLoader from '../common/ComponentLoader/ComponentLoader';
import FilterToolbar from './FilterToolbar/FilterToolbar';
import {Relation} from '../../reducers/users/types';

const Users: React.FC = () => {
  const currentUserId = useSelector(selectUserId);
  const users = useSelector(selectUsers);
  const size = useSelector(selectSize);
  const total = useSelector(selectTotal);
  const page = useSelector(selectPage);
  const fetching = useSelector(selectFetching);
  const following = useSelector(selectFollowing);
  const available = useSelector(selectAvailable);
  const relation = useSelector(selectRelation);
  const filter = useSelector(selectFilter);
  const authenticated = useSelector(selectAuthenticated);

  const dispatch = useDispatch();

  const [pageParam, setPageParam] = useQueryParam('page', StringParam);
  const [sizeParam, setSizeParam] = useQueryParam('size', StringParam);
  const [filterParam, setFilterParam] = useQueryParam('filter', StringParam);
  const [relationParam, setRelationParam] = useQueryParam(
    'relation',
    StringParam
  );

  const [firstRendering, setFirstRendering] = useState(true);

  useEffect(() => {
    dispatch(setFilter(filterParam || ''));
  }, [dispatch, filterParam]);

  useEffect(() => {
    if (relationParam && Object.keys(Relation).includes(relationParam)) {
      dispatch(setRelation(+relationParam!));
    } else {
      dispatch(setRelation(Relation.ALL));
    }
  }, [dispatch, relationParam]);

  useEffect(() => {
    if (sizeParam && available.includes(sizeParam)) {
      dispatch(setSize(+sizeParam));
    } else {
      dispatch(setSize(+available[0]));
    }
    // eslint-disable-next-line
  }, [dispatch, sizeParam]);

  useEffect(() => {
    if (pageParam && +pageParam > 0 && Number.isInteger(+pageParam)) {
      dispatch(setPage(+pageParam));
    } else {
      dispatch(setPage(1));
    }
  }, [dispatch, pageParam]);

  useEffect(() => {
    if (firstRendering) {
      setFirstRendering(false);

      return;
    }

    dispatch(getUsers(page, size, relation, filter));
    setPageParam(page + '', 'replaceIn');

    if (!filter) {
      setFilterParam(undefined, 'replaceIn');
    }
  }, [
    dispatch,
    page,
    size,
    relation,
    filter,
    firstRendering,
    setFirstRendering,
    setPageParam,
    setFilterParam,
  ]);

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
      setPageParam(page + '', 'pushIn');
    },
    [setPageParam]
  );

  const setSizeHandler = useCallback(
    (size: number) => {
      setSizeParam(size + '');
    },
    [setSizeParam]
  );

  const setRelationHandler = useCallback(
    (relation: Relation) => {
      setRelationParam(relation + '');
    },
    [setRelationParam]
  );

  const setFilterHandler = useCallback(
    (filter) => {
      setFilterParam(filter);

      if (!filter) {
        dispatch(setFilter(''));
      }
    },
    [dispatch, setFilterParam]
  );

  const showUserCards = (): JSX.Element | JSX.Element[] => {
    if (fetching || !users) {
      return <ComponentLoader />;
    }

    if (!users.length) {
      return (
        <h4 className="d-flex justify-content-center text-secondary">
          Not found...
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
