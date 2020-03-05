import React from 'react';
import {connect} from 'react-redux';
import {Card, InputGroup, FormControl, FormLabel} from 'react-bootstrap';
import cn from 'classnames';

import {updatePhoto} from '../../../reducers/profile/thunks';
import {selectFetchingPhoto, selectLargePhoto} from '../../../selectors/profile';
import ComponentLoader from '../../common/ComponentLoader/ComponentLoader';
import {
  AvatarCardDispatchProps,
  AvatarCardOwnProps,
  AvatarCardProps,
  AvatarCardStateProps
} from './types';
import {RootState} from '../../../store/types';

import style from './AvatarCard.module.css';
import avatar from '../../../assets/images/avatar.png';

const AvatarCard: React.FC<AvatarCardProps> = ({
                                                 photo,
                                                 updatePhoto,
                                                 fetching,
                                                 editable = false
                                               }) => {
  const imageUrl = photo || avatar;

  const onSelectImage = ({target: {files}}: React.ChangeEvent<HTMLInputElement>) => (
    files && files.length && updatePhoto(files[0])
  );

  const showImage = () => (
    fetching
      ? (<div className={cn(style.avatar, 'pt-3')}><ComponentLoader/></div>)
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

const mapStateToProps = (state: RootState): AvatarCardStateProps => ({
  photo: selectLargePhoto(state),
  fetching: selectFetchingPhoto(state)
});

const stateContainer = (
  connect<AvatarCardStateProps, AvatarCardDispatchProps, AvatarCardOwnProps, RootState>(
    mapStateToProps,
    {updatePhoto}
  )
);

export default stateContainer(AvatarCard);