import {InputGroupProps} from 'react-bootstrap';

export type PageSizeSelectorProps = {
  available: string[];
  current: string;
  change: (value: number) => void;
  disabled?: boolean;
  size?: InputGroupProps['size'];
};
