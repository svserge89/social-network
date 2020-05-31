import React, {useCallback, useRef} from 'react';
import {faFileImage} from '@fortawesome/free-solid-svg-icons';

import {UploadImageButtonProps} from './types';
import ButtonWithIcon from '../../../common/ButtonWithIcon/ButtonWithIcon';

import style from './UploadImageButton.module.css';

const UploadImageButton: React.FC<UploadImageButtonProps> = ({onChange, fetching = false}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => inputRef.current!.click(), [inputRef]);

  return (
    <>
      <input className={style.imageInput}
             ref={inputRef}
             type="file"
             accept="image/x-png,image/jpeg"
             onChange={onChange}/>
      <ButtonWithIcon icon={faFileImage} onClick={handleClick} disabled={fetching}>
        Change image
      </ButtonWithIcon>
    </>
  );
};

export default UploadImageButton;
