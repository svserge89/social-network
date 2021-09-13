import React from 'react';
import {Spinner} from 'react-bootstrap';
import cn from 'classnames';

import style from './PageLoader.module.css';

const PageLoader: React.FC = () => (
  <div className={cn(style.container, 'bg-primary')}>
    <div className="d-flex">
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h4 className="ms-2 text-white">Loading...</h4>
    </div>
  </div>
);

export default React.memo(PageLoader);
