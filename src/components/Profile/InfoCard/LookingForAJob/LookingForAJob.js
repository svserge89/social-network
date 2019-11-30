import React from 'react';
import {Card} from 'react-bootstrap';

const LookingForAJob = ({answer, description}) => {
  const showAnswer = () => (
    answer ? (<span className="text-success">Yes</span>) : (<span className="text-danger">No</span>)
  );

  const showDescription = () => (answer && (<p>{description}</p>));

  return (
    <Card.Text as="div"><h5>Looking for a job: {showAnswer()}</h5>{showDescription()}</Card.Text>
  );
};

export default LookingForAJob;