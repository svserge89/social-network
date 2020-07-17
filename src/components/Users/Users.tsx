import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {getUsers, cleanUsers, follow, unfollow} from '../../reducers/users/thunks';
import {setFilter, setPage, setSize, setRelation} from '../../reducers/users/action-creators';
import {
  selectAvailable,
  selectFetching,
  selectFilter,
  selectFollowing,
  selectPage,
  selectSize,
  selectTotal,
  selectUsers,
  selectRelation
} from '../../selectors/users';
import {selectAuthenticated, selectUserId} from '../../selectors/auth';
import UserCard from './UserCard/UserCard';
import PageNavToolbar from '../common/PageNavToolbar/PageNavToolbar';
import ComponentLoader from '../common/ComponentLoader/ComponentLoader';
import FilterToolbar from './FilterToolbar/FilterToolbar';

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

  useEffect(() => {
    dispatch(getUsers(page, size, relation, filter));
  }, [dispatch, page, size, relation, filter]);

  useEffect(() => () => {
    dispatch(cleanUsers());
  }, [dispatch]);

  const isFollowing = useCallback(
    (userId: number): boolean => following.includes(userId),
    [following]
  );

  const followHandler = useCallback((userId) => dispatch(follow(userId)), [dispatch]);

  const unfollowHandler = useCallback((userId) => dispatch(unfollow(userId)), [dispatch]);

  const setPageHandler = useCallback((page) => dispatch(setPage(page)), [dispatch]);

  const setSizeHandler = useCallback((size) => dispatch(setSize(size)), [dispatch]);

  const setRelationHandler = useCallback((relation) => dispatch(setRelation(relation)), [dispatch]);

  const setFilterHandler = useCallback((filter) => dispatch(setFilter(filter)), [dispatch]);

  const showUserCards = (): JSX.Element | JSX.Element[] => {
    if (fetching || !users) return (
      <Row><Col className="col-12 p-0"><ComponentLoader/></Col></Row>
    );

    return (
      users.map(({id, name, status, photos: {small}, followed}) => (
        <Row key={id} className="mb-1">
          <Col className="col-12 p-0">
            <UserCard userId={id}
                      name={name}
                      status={status || ''}
                      image={small}
                      followed={followed}
                      following={isFollowing(id)}
                      currentUserId={currentUserId}
                      follow={followHandler}
                      unfollow={unfollowHandler}/>
          </Col>
        </Row>
      ))
    );
  };

  return (
    <>
      <Row>
        <Col className="col-12 p-0">
          <FilterToolbar relation={relation}
                         filter={filter}
                         setFilter={setFilterHandler}
                         setRelation={setRelationHandler}
                         filterOnly={!authenticated}
                         fetching={fetching}/>
        </Col>
      </Row>
      <Row>
        <Col className="col-12 p-0 mb-3">
          <PageNavToolbar total={total}
                          size={size}
                          page={page}
                          setPage={setPageHandler}
                          setSize={setSizeHandler}
                          available={available}
                          fetching={fetching}/>
        </Col>
      </Row>
      {showUserCards()}
    </>
  );
};

export default Users;
