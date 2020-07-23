import React, {useCallback} from 'react';
import {Card, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import cn from 'classnames';

import {PROFILE} from '../../../utils/routes';
import FollowButton from '../../common/FollowButton/FollowButton';
import {UserCardProps} from './types';

import smallAvatar from '../../../assets/images/small-avatar.png';
import style from './UserCard.module.css';

const UserCard: React.FC<UserCardProps> = ({
  image,
  name,
  status,
  follow,
  unfollow,
  followed,
  currentUserId,
  following,
  userId,
}) => {
  const handleFollow = useCallback(() => follow(userId), [follow, userId]);

  const handleUnfollow = useCallback(() => unfollow(userId), [
    unfollow,
    userId,
  ]);

  const showButton = (): JSX.Element | '' =>
    currentUserId && currentUserId !== userId ? (
      <FollowButton
        followed={followed}
        follow={handleFollow}
        unfollow={handleUnfollow}
        following={following}
      />
    ) : (
      ''
    );

  const imageSrc = image ? image : smallAvatar;

  return (
    <Card className="p-1">
      <div className="d-flex">
        <LinkContainer to={`${PROFILE}/${userId}`} className="flex-shrink-0">
          <Card.Link>
            <Image
              src={imageSrc}
              rounded={true}
              className={cn(style.image, 'bg-light')}
            />
          </Card.Link>
        </LinkContainer>
        <Card.Body className="flex-shrink-2 text-nowrap text-truncate">
          <Card.Title className="text-nowrap text-truncate" title={name}>
            {name}
          </Card.Title>
          <Card.Text className="text-nowrap text-truncate" title={status}>
            {status}
          </Card.Text>
        </Card.Body>
        <div className="flex-shrink-0 align-self-center">{showButton()}</div>
      </div>
    </Card>
  );
};

export default UserCard;
