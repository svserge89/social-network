import React from 'react';
import {Card} from 'react-bootstrap';

import {LookingForAJobProps} from './types';

const LookingForAJob: React.FC<LookingForAJobProps> = ({answer, description}) => {
  const showAnswer = (): JSX.Element => (
    answer ? (<span className="text-success">Yes</span>) : (<span className="text-danger">No</span>)
  );

  const showDescription = (): JSX.Element | '' => (answer ? (<pre>{description}</pre>) : '');

  return (
    <Card.Text as="div"><h5>Looking for a job: {showAnswer()}</h5>{showDescription()}</Card.Text>
  );
};

export default LookingForAJob;