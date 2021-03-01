import React from 'react';
import {Card, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import cn from 'classnames';

import {MessageCardProps} from './types';
import {PROFILE} from '../../../utils/routes';

import style from './MessageCard.module.css';
import smallAvatar from '../../../assets/images/small-avatar.png';

const MessageCard: React.FC<MessageCardProps> = ({
  userId,
  userName,
  text,
  photo,
  left = false,
}) => {
  const imageSrc = photo ? photo : smallAvatar;
  const profileLink = `${PROFILE}/${userId}`;

  return (
    <Card className={cn(style.card, {'align-self-end': left})}>
      <div className={cn('d-flex', {'flex-row-reverse': left})}>
        <LinkContainer to={profileLink}>
          <Card.Link>
            <Image
              src={imageSrc}
              rounded={true}
              className={cn(style.image, 'bg-light', 'm-2')}
            />
          </Card.Link>
        </LinkContainer>
        <Card.Body
          className={cn('flex-shrink-2', 'text-wrap', 'text-truncate', 'py-1', {
            'pl-0': !left,
            'pl-2': left,
            'pr-0': left,
            'pr-2': !left,
          })}
        >
          <Card.Text>{text}</Card.Text>
        </Card.Body>
      </div>
      <Card.Footer
        className={cn('px-2 pt-2 pb-0', 'd-flex', {'flex-row-reverse': left})}
      >
        <LinkContainer to={profileLink}>
          <Card.Subtitle
            as="a"
            className={cn(
              style.subtitle,
              'text-primary',
              'text-nowrap',
              'text-truncate'
            )}
            title={userName}
          >
            {userName}
          </Card.Subtitle>
        </LinkContainer>
      </Card.Footer>
    </Card>
  );
};

export default React.memo(MessageCard);
