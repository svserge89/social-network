import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import ButtonLoader from '../../common/ButtonLoader/ButtonLoader';

import smallAvatar from '../../../assets/images/small-avatar.png';
import style from './UserCard.module.css';

const UserCard = ({
  image,
  name,
  status,
  follow,
  unfollow,
  followed,
  currentUserId,
  following,
  userId
}) => {
  const onFollow = () => follow(userId);

  const onUnfollow = () => unfollow(userId);

  const showButton = () => {
    if (!currentUserId || currentUserId === userId) return;

    if (following) return (<ButtonLoader />);

    if (followed) {
      return (
        <Button variant="danger" onClick={onUnfollow}>
          Unfollow
        </Button>
      );
    }

    return (
      <Button variant="success" onClick={onFollow}>
        Follow
      </Button>
    );
  };

  return (
    <Card className="col-12 p-1">
      <div className={style.cardHorizontal}>
        <LinkContainer to={`/profile/${userId}`}>
          <Card.Link>
            <Image src={image ? image : smallAvatar} thumbnail />
          </Card.Link>
        </LinkContainer>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{status}</Card.Text>
        </Card.Body>
        <div className="my-auto">{showButton()}</div>
      </div>
    </Card>
  );
};

export default UserCard;