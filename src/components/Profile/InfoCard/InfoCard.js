import React from 'react';
import { Card } from 'react-bootstrap';

import ContactList from './ContactList/ContactList';
import Status from './Status/Status';

const InfoCard = ({
  fullName,
  status,
  contacts,
  lookingForAJob,
  lookingForAJobDescription,
  aboutMe,
  setStatus,
  fetchingStatus,
  editableStatus
}) => {
  const showLookingForAJob = () => (
    lookingForAJob && (
      <Card.Text as="div">
        <h5>Lockign for a job</h5>
        <p className="text-nowrap text-truncate">
          {lookingForAJobDescription}
        </p>
      </Card.Text>
    )
  );

  const showAboutMe = () => (
    aboutMe ? (<p>{aboutMe}</p>) : (<p className="text-secondary">Empty.</p>)
  );

  return (
    <Card className="ml-3 flex-grow-1 flex-shrink-1">
      <Card.Header>
        <Card.Title><strong>{fullName}</strong></Card.Title>
        <Status
          status={status}
          editable={editableStatus}
          setStatus={setStatus}
          fetching={fetchingStatus}
        />
      </Card.Header>
      <Card.Body>
        <Card.Text as="div">
          <h5>Contacts</h5>
          <ContactList contacts={contacts} />
        </Card.Text>
        {showLookingForAJob()}
        <Card.Text as="div">
          <h5>About me</h5>
          {showAboutMe()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;