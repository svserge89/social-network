import React from 'react';
import {Button, Spinner} from 'react-bootstrap';
import cn from 'classnames';

import {ButtonLoaderProps} from './types';

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  size,
  outline = false,
  noLabel = false,
}) => (
  <Button variant={outline ? 'outline-info' : 'info'} disabled size={size}>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className={cn('text-white', {'ms-1': !noLabel})}>
      {noLabel ? '' : 'Loading...'}
    </span>
  </Button>
);

export default React.memo(ButtonLoader);
