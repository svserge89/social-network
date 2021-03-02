import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {Area} from 'react-easy-crop/types';
import Cropper from 'react-easy-crop';
import {faFileUpload, faTimes} from '@fortawesome/free-solid-svg-icons';

import {CropImageModalProps} from './types';
import Slider from '../../../common/Slider/Slider';
import getCroppedImg from '../../../../utils/crop-image';
import {updatePhoto} from '../../../../reducers/profile/thunks';
import ButtonWithIcon from '../../../common/ButtonWithIcon/ButtonWithIcon';

import style from './CropImageModal.module.css';

const CropImageModal: React.FC<CropImageModalProps> = ({
  show,
  imageUrl,
  handleClose,
}) => {
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const dispatch = useDispatch();

  const handleCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels]
  );

  const handleZoom = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setZoom(+event.target.value),
    [setZoom]
  );

  const handleRotation = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setRotation(+event.target.value),
    [setRotation]
  );

  const handleUpload = useCallback(async () => {
    handleClose();

    const blob = await getCroppedImg(imageUrl, croppedAreaPixels!, rotation);

    await dispatch(updatePhoto(blob));
  }, [dispatch, imageUrl, croppedAreaPixels, rotation, handleClose]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crop image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={style.container}>
          <Cropper
            image={imageUrl}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Slider
          label="Zoom"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          handleChange={handleZoom}
        />
        <Slider
          label="Rotate"
          min={0}
          max={360}
          step={1}
          value={rotation}
          handleChange={handleRotation}
        />
        <ButtonWithIcon
          variant="success"
          onClick={handleUpload}
          icon={faFileUpload}
        >
          Upload image
        </ButtonWithIcon>
        <ButtonWithIcon variant="danger" onClick={handleClose} icon={faTimes}>
          Close
        </ButtonWithIcon>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(CropImageModal);
