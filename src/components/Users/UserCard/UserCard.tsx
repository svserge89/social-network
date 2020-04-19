import React, {useCallback} from 'react';
import {Card, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import cn from 'classnames';
import {faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons';

import {PROFILE} from '../../../utils/routes';
import ButtonLoader from '../../common/ButtonLoader/ButtonLoader';
import ButtonWithIcon from '../../common/ButtonWithIcon/ButtonWithIcon';
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
                                             userId
                                           }) => {
  const handleFollow = useCallback(() => follow(userId), [follow, userId]);

  const handleUnfollow = useCallback(() => unfollow(userId), [unfollow, userId]);

  const showButton = (): JSX.Element | '' => {
    if (!currentUserId || currentUserId === userId) return '';

    if (following) return (<ButtonLoader/>);

    if (followed) {
      return (<ButtonWithIcon variant="danger" icon={faHeartBroken} onClick={handleUnfollow}>Unfollow</ButtonWithIcon>);
    }

    return (<ButtonWithIcon variant="success" icon={faHeart} onClick={handleFollow}>Follow</ButtonWithIcon>);
  };

  const imageSrc = image ? image : smallAvatar;

  return (
    <Card className="p-1">
      <div className="d-flex">
        <LinkContainer to={`${PROFILE}/${userId}`} className="flex-shrink-0">
          <Card.Link>
            <Image src={imageSrc} thumbnail className={cn(style.image, 'bg-light')}/>
          </Card.Link>
        </LinkContainer>
        <Card.Body className="flex-shrink-2 text-nowrap text-truncate">
          <Card.Title className="text-nowrap text-truncate" title={name}>{name}</Card.Title>
          <Card.Text className="text-nowrap text-truncate" title={status}>{status}</Card.Text>
        </Card.Body>
        <div className="flex-shrink-0 align-self-center">{showButton()}</div>
      </div>
    </Card>
  );
};

export default UserCard;
