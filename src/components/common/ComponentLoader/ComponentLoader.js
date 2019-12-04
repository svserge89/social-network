import React from 'react';
import {Spinner} from 'react-bootstrap';
import cn from 'classnames';

const ComponentLoader = ({size, center = true}) => {
  const showLabel = () => (
    size === 'sm'
      ? (<strong className="text-secondary mr-1">Loading...</strong>)
      : (<h4 className="text-secondary mr-2">Loading...</h4>)
  );

  return (
    <div className={cn('d-flex', {'justify-content-center': center})}>
      {showLabel()}
      <Spinner size={size} animation="border" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
};

export default ComponentLoader;