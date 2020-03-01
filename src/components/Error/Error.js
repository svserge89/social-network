import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';

import {HOME} from '../../utils/routes';

const Error = ({code, description}) => {
  const reloadHandler = () => window.location.reload();

  const showButton = () => (
    code === 404
      ? (<Button variant="success" href={HOME}>Home page</Button>)
      : (<Button variant="success" onClick={reloadHandler}>Reload page</Button>)
  );

  return (
    <Row className="mt-3">
      <Col className="col-12 px-0">
        <Card bg="danger" text="white">
          <Card.Header><h5>Error</h5></Card.Header>
          <Card.Body>
            <Card.Title>Code: {code}</Card.Title>
            <Card.Text>{description}</Card.Text>
            {showButton()}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Error;