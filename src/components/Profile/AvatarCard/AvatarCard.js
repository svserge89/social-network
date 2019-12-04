import React from 'react';
import {Card, InputGroup, FormControl, FormLabel} from 'react-bootstrap';

import ComponentLoader from '../../common/ComponentLoader/ComponentLoader';

import style from './AvatarCard.module.css';
import avatar from '../../../assets/images/avatar.png';

const AvatarCard = ({image, updateImage, editable, fetching}) => {
  const imageUrl = image ? image : avatar;

  const onSelectImage = ({target: {files}}) => files.length && updateImage(files[0]);

  const showImage = () => (
    fetching
      ? (<div className={`${style.avatar} pt-3`}><ComponentLoader/></div>)
      : (<Card.Img variant="top" src={imageUrl} className={style.avatar}/>)
  );

  const showButtonToolbar = () => (
    editable && (
      <Card.Body className="px-0 pb-0 pt-1">
        <InputGroup>
          <FormControl className="custom-file-input"
                       type="file"
                       id="uploadImage"
                       accept="image/x-png,image/jpeg"
                       onChange={onSelectImage}
                       disabled={fetching}/>
          <FormLabel column={false} className="custom-file-label" htmlFor="uploadImage">
            Choose image
          </FormLabel>
        </InputGroup>
      </Card.Body>
    )
  );

  return (
    <Card className="mb-auto flex-shrink-0 flex-grow-0 bg-light p-1">
      {showImage()}
      {showButtonToolbar()}
    </Card>
  );
};

export default AvatarCard;