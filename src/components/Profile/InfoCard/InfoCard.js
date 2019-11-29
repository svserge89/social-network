import React, {useState} from 'react';
import {Card, Button} from 'react-bootstrap';

import ContactList from './ContactList/ContactList';
import Status from './Status/Status';
import LookingForAJob from './LookingForAJob/LookingForAJob';
import EditInfoForm from './EditInfoForm/EditInfoForm';

const InfoCard = ({
                    fullName,
                    status,
                    contacts,
                    lookingForAJob,
                    lookingForAJobDescription,
                    aboutMe,
                    contactLabels,
                    setStatus,
                    fetchingStatus,
                    updateProfile,
                    editable,
                    updating
                  }) => {
  const [editMode, setEditMode] = useState(false);

  const showAboutMe = () => (
    aboutMe ? (<p>{aboutMe}</p>) : (<p className="text-secondary">Empty.</p>)
  );

  const onEdit = () => setEditMode(true);

  const onSubmit = (profile) => {
    updateProfile(profile)
  };

  const showEditButton = () => editable && (<Button onClick={onEdit}>Edit</Button>);

  const showBody = () => (
    !editMode
      ? (
        <Card.Body>
          <Card.Text as="div">
            <h5>Contacts</h5>
            <ContactList contacts={contacts} labels={contactLabels}/>
          </Card.Text>
          <LookingForAJob answer={lookingForAJob} description={lookingForAJobDescription}/>
          <Card.Text as="div"><h5>About me</h5>{showAboutMe()}</Card.Text>
          {showEditButton()}
        </Card.Body>
      )
      : (
        <Card.Body>
          <EditInfoForm onSubmit={onSubmit}
                        setEditMode={setEditMode}
                        contactLabels={contactLabels}
                        updating={updating}/>
        </Card.Body>
      )
  );

  return (
    <Card className="ml-3 flex-shrink-1 flex-grow-1">
      <Card.Header>
        <Card.Title>
          <span className="font-weight-bold text-nowrap text-truncate">{fullName}</span>
        </Card.Title>
        <Status status={status}
                editable={editable}
                setStatus={setStatus}
                fetching={fetchingStatus}/>
      </Card.Header>
      {showBody()}
    </Card>
  );
};

export default InfoCard;