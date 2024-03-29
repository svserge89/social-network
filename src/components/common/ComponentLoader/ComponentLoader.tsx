import React from 'react';
import {Spinner} from 'react-bootstrap';
import cn from 'classnames';

import {ComponentLoaderProps} from './types';

const ComponentLoader: React.FC<ComponentLoaderProps> = ({
  size,
  center = true,
}) => {
  const showLabel: () => JSX.Element = () =>
    size === 'sm' ? (
      <strong className="text-secondary ms-1">Loading...</strong>
    ) : (
      <h4 className="text-secondary ms-2">Loading...</h4>
    );

  return (
    <div className={cn('d-flex', {'justify-content-center': center})}>
      <Spinner size={size} animation="border" role="status" variant="secondary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {showLabel()}
    </div>
  );
};

export default React.memo(ComponentLoader);
