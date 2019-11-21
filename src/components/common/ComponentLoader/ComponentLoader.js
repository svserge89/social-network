import React from 'react';
import { Spinner } from 'react-bootstrap';

const ComponentLoader = () => (
  <div className="d-flex justify-content-center">
    <h4 className="text-secondary mr-2">Loading...</h4>
    <Spinner animation="border" role="status" variant="secondary">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default ComponentLoader;