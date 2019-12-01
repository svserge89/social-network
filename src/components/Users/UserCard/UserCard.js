import React from 'react';
import {Card, Image, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

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

    if (following) return (<ButtonLoader/>);

    if (followed) {
      return (<Button variant="danger" onClick={onUnfollow}>Unfollow</Button>);
    }

    return (<Button variant="success" onClick={onFollow}>Follow</Button>);
  };

  const imageSrc = image ? image : smallAvatar;

  return (
    <Card className="p-1">
      <div className="d-flex">
        <LinkContainer to={`/profile/${userId}`} className="flex-shrink-0">
          <Card.Link>
            <Image src={imageSrc} thumbnail className={`${style.image} bg-light`}/>
          </Card.Link>
        </LinkContainer>
        <Card.Body className="flex-shrink-2">
          <Card.Title className="text-nowrap text-truncate" title={name}>{name}</Card.Title>
          <Card.Text className="text-nowrap text-truncate" title={status}>{status}</Card.Text>
        </Card.Body>
        <div className="flex-shrink-0 align-self-center">{showButton()}</div>
      </div>
    </Card>
  );
};

export default UserCard;