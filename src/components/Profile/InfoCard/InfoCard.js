import React, {useState} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Card, Button} from 'react-bootstrap';

import {updateProfile, updateStatus} from '../../../reducers/profile/thunks';
import {
  aboutMeSelector,
  contactLabelsSelector,
  contactsSelector,
  fetchingStatusSelector,
  fullNameSelector,
  lookingForAJobDescriptionSelector,
  lookingForAJobSelector,
  statusSelector,
  updatingSelector
} from '../../../selectors/profileSelectors';
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
                    fetchingStatus,
                    updateStatus,
                    updateProfile,
                    updating,
                    editable = false
                  }) => {
  const [editMode, setEditMode] = useState(false);

  const showAboutMe = () => (
    aboutMe ? (<pre>{aboutMe}</pre>) : (<p className="text-secondary">Empty.</p>)
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
        <Card.Title className="font-weight-bold text-nowrap text-truncate" title={fullName}>
          {fullName}
        </Card.Title>
        <Status status={status}
                editable={editable}
                setStatus={updateStatus}
                fetching={fetchingStatus}/>
      </Card.Header>
      {showBody()}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  fullName: fullNameSelector(state),
  status: statusSelector(state),
  contacts: contactsSelector(state),
  lookingForAJob: lookingForAJobSelector(state),
  lookingForAJobDescription: lookingForAJobDescriptionSelector(state),
  aboutMe: aboutMeSelector(state),
  contactLabels: contactLabelsSelector(state),
  fetchingStatus: fetchingStatusSelector(state),
  updating: updatingSelector(state)
});

export default compose(connect(mapStateToProps, {updateStatus, updateProfile}))(InfoCard);