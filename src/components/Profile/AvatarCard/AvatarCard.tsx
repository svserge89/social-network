import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Image} from 'react-bootstrap';
import cn from 'classnames';

import {
  selectFetchingPhoto,
  selectFollowed,
  selectFollowing,
  selectLargePhoto,
} from '../../../selectors/profile';
import {selectAuthenticated} from '../../../selectors/auth';
import ComponentLoader from '../../common/ComponentLoader/ComponentLoader';
import FollowButton from '../../common/FollowButton/FollowButton';
import {follow, getFollowed, unfollow} from '../../../reducers/profile/thunks';
import UploadImageButton from './UploadImageButton/UploadImageButton';
import CropImageModal from './CropImageModal/CropImageModal';
import {AvatarCardProps} from './types';

import style from './AvatarCard.module.css';
import avatar from '../../../assets/images/avatar.png';

const AvatarCard: React.FC<AvatarCardProps> = ({editable = false}) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const authenticated = useSelector(selectAuthenticated);
  const photo = useSelector(selectLargePhoto);
  const fetching = useSelector(selectFetchingPhoto);
  const followed = useSelector(selectFollowed);
  const following = useSelector(selectFollowing);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!editable && authenticated) {
      dispatch(getFollowed());
    }
  }, [editable, authenticated, dispatch]);

  const imageUrl = photo || avatar;

  const handleFollow = useCallback(() => dispatch(follow()), [dispatch]);

  const handleUnfollow = useCallback(() => dispatch(unfollow()), [dispatch]);

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
    },
    [setShowModal]
  );

  const handleCloseModal = useCallback(() => setShowModal(false), [
    setShowModal,
  ]);

  const showImage = (): JSX.Element =>
    fetching ? (
      <div className={cn(style.avatar, 'pt-3')}>
        <ComponentLoader />
      </div>
    ) : (
      <Image rounded={true} src={imageUrl} className={style.avatar} />
    );

  const showButtonToolbar = (): JSX.Element | '' => {
    if (editable) {
      return (
        <UploadImageButton onChange={handleSelectImage} fetching={fetching} />
      );
    } else if (authenticated) {
      return (
        <FollowButton
          followed={followed!}
          follow={handleFollow}
          unfollow={handleUnfollow}
          following={following}
        />
      );
    } else {
      return '';
    }
  };

  const showCropImageModal = (): JSX.Element | '' =>
    editable ? (
      <CropImageModal
        show={showModal}
        imageUrl={fileUrl}
        handleClose={handleCloseModal}
      />
    ) : (
      ''
    );

  return (
    <>
      {showCropImageModal()}
      <Card className="mb-auto flex-shrink-0 flex-grow-0 bg-light p-1">
        <Card.Title className="mb-0">{showImage()}</Card.Title>
        <Card.Body className="d-flex px-0 pb-0 pt-1 justify-content-center">
          {showButtonToolbar()}
        </Card.Body>
      </Card>
    </>
  );
};

export default AvatarCard;
