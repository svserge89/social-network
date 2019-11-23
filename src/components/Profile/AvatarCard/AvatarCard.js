import React from 'react';
import { Card, Button, ButtonToolbar } from 'react-bootstrap';

import style from './AvatarCard.module.css';
import avatar from '../../../assets/images/avatar.png';

const AvatarCard = ({
  image,
  updateImage,
  editProfile,
  editable,
  fetching
}) => {
  const imageUrl = image ? image : avatar;

  const showButtonToolbar = () => (
    editable && (
      <Card.Body>
        <ButtonToolbar className="justify-content-between">
          <Button onClick={updateImage} disabled={fetching}>
            Update photo
          </Button>
          <Button onClick={editProfile} disabled={fetching}>
            Edit profile
          </Button>
        </ButtonToolbar>
      </Card.Body>
    )
  );

  return (
    <Card className="mb-auto">
      <Card.Img variant="top" src={imageUrl} className={style.avatar} />
      {showButtonToolbar()}
    </Card>
  );
};

export default AvatarCard;