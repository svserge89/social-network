import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {Card, InputGroup, FormControl, FormLabel, Image} from 'react-bootstrap';
import cn from 'classnames';

import {selectFetchingPhoto, selectLargePhoto} from '../../../selectors/profile';
import ComponentLoader from '../../common/ComponentLoader/ComponentLoader';
import CropImageModal from './CropImageModal/CropImageModal';
import {AvatarCardProps} from './types';

import style from './AvatarCard.module.css';
import avatar from '../../../assets/images/avatar.png';

const AvatarCard: React.FC<AvatarCardProps> = ({editable = false}) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const photo = useSelector(selectLargePhoto);
  const fetching = useSelector(selectFetchingPhoto);

  const imageUrl = photo || avatar;

  const handleSelectImage = useCallback(
    ({target}: React.ChangeEvent<HTMLInputElement>) => {
      if (target.files && target.files.length) {
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          setFileUrl(fileReader.result as string);
          setShowModal(true);
          target.value = '';
        };

        fileReader.readAsDataURL(target.files[0]);
      }
    }, [setShowModal]);

  const handleCloseModal = useCallback(() => setShowModal(false), [setShowModal]);

  const showImage = (): JSX.Element => (
    fetching
      ? (<div className={cn(style.avatar, 'pt-3')}><ComponentLoader/></div>)
      : (<Image rounded={true} src={imageUrl} className={style.avatar}/>)
  );

  const showButtonToolbar = (): JSX.Element | '' => (
    editable
      ? (
        <Card.Body className="px-0 pb-0 pt-1">
          <InputGroup>
            <FormControl className="custom-file-input"
                         type="file"
                         id="uploadImage"
                         accept="image/x-png,image/jpeg"
                         onChange={handleSelectImage}
                         disabled={fetching}/>
            <FormLabel column={false} className="custom-file-label" htmlFor="uploadImage">
              Choose image
            </FormLabel>
          </InputGroup>
        </Card.Body>
      )
      : ''
  );

  const showCropImageModal = (): JSX.Element | '' => (
    editable ? (<CropImageModal show={showModal} imageUrl={fileUrl} handleClose={handleCloseModal}/>) : ''
  );

  return (
    <>
      {showCropImageModal()}
      <Card className="mb-auto flex-shrink-0 flex-grow-0 bg-light p-1">
        <Card.Title className="mb-0">
          {showImage()}
        </Card.Title>
        {showButtonToolbar()}
      </Card>
    </>
  );
};

export default AvatarCard;
