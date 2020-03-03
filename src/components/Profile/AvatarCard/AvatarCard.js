import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Card, InputGroup, FormControl, FormLabel} from 'react-bootstrap';
import cn from 'classnames';

import {updatePhoto} from '../../../reducers/profile/thunks';
import {selectFetchingPhoto, selectLargePhoto} from '../../../selectors/profile';
import ComponentLoader from '../../common/ComponentLoader/ComponentLoader';

import style from './AvatarCard.module.css';
import avatar from '../../../assets/images/avatar.png';

const AvatarCard = ({photo, updatePhoto, fetching, editable = false}) => {
  const imageUrl = photo ? photo : avatar;

  const onSelectImage = ({target: {files}}) => files.length && updatePhoto(files[0]);

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

const mapStateToProps = (state) => ({
  photo: selectLargePhoto(state),
  fetching: selectFetchingPhoto(state)
});

export default compose(connect(mapStateToProps, {updatePhoto}))(AvatarCard);