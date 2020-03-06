import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Card, Button} from 'react-bootstrap';

import {updateProfile, updateStatus} from '../../../reducers/profile/thunks';
import {
  selectAboutMe,
  selectContactLabels,
  selectContacts,
  selectFetchingStatus,
  selectFullName,
  selectLookingForAJobDescription,
  selectLookingForAJob,
  selectStatus,
  selectUpdating
} from '../../../selectors/profile';
import ContactList from './ContactList/ContactList';
import Status from './Status/Status';
import LookingForAJob from './LookingForAJob/LookingForAJob';
import EditInfoForm from './EditInfoForm/EditInfoForm';
import {InfoCardDispatchProps, InfoCardOwnProps, InfoCardProps, InfoCardStateProps} from './types';
import {Profile} from '../../../models/types';
import {RootState} from '../../../store/types';
import {FormSubmitHandler} from 'redux-form';

const InfoCard: React.FC<InfoCardProps> = ({
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

  const showAboutMe = (): JSX.Element => (
    aboutMe ? (<pre>{aboutMe}</pre>) : (<p className="text-secondary">Empty.</p>)
  );

  const onEdit = () => setEditMode(true);

  const onSubmit: FormSubmitHandler<Profile> = (profile: Profile) => {
    updateProfile(profile)
  };

  const showEditButton = (): JSX.Element | '' => (
    editable ? (<Button onClick={onEdit}>Edit</Button>) : ''
  );

  const showBody = (): JSX.Element => (
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

const mapStateToProps = (state: RootState): InfoCardStateProps => ({
  fullName: selectFullName(state),
  status: selectStatus(state),
  contacts: selectContacts(state),
  lookingForAJob: selectLookingForAJob(state),
  lookingForAJobDescription: selectLookingForAJobDescription(state),
  aboutMe: selectAboutMe(state),
  contactLabels: selectContactLabels(state),
  fetchingStatus: selectFetchingStatus(state),
  updating: selectUpdating(state)
});

const stateContainer = (
  connect<InfoCardStateProps, InfoCardDispatchProps, InfoCardOwnProps, RootState>(
    mapStateToProps,
    {updateStatus, updateProfile}
  )
);

export default stateContainer(InfoCard);