import React from 'react';
import {Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faTimes, faSearch} from '@fortawesome/free-solid-svg-icons';

import {LookingForAJobProps} from './types';
import ComponentWithIcon from '../../../common/ComponentWithIcon/ComponentWithIcon';

const LookingForAJob: React.FC<LookingForAJobProps> = ({
  answer,
  description,
}) => {
  const showAnswer = (): JSX.Element =>
    answer ? (
      <span className="text-success">
        <FontAwesomeIcon icon={faCheck} />
      </span>
    ) : (
      <span className="text-danger">
        <FontAwesomeIcon icon={faTimes} />
      </span>
    );

  const showDescription = (): JSX.Element | '' =>
    answer ? <pre>{description}</pre> : '';

  return (
    <Card.Text as="div">
      <h5>
        <ComponentWithIcon icon={faSearch}>
          Looking for a job: {showAnswer()}
        </ComponentWithIcon>
      </h5>
      {showDescription()}
    </Card.Text>
  );
};

export default LookingForAJob;
