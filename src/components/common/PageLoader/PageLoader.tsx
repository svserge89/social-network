import React from 'react';
import {Spinner, Container, Row} from 'react-bootstrap';

import style from './PageLoader.module.css';

const PageLoader: React.FC = () => (
  <div className={style.container}>
    <Container fluid={true} className="h-100 bg-primary">
      <Row className="d-flex align-items-center justify-content-center h-100">
        <h4 className="mr-2 text-white">Loading...</h4>
        <Spinner animation="border" role="status" variant="light">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Row>
    </Container>
  </div>
);

export default PageLoader;
