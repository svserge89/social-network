import {ChangeEvent} from 'react';

export type UploadImageButtonProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fetching?: boolean;
};
