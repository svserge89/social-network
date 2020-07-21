import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import {faEdit, faAddressCard, faBook} from '@fortawesome/free-solid-svg-icons';

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
import ComponentWithIcon from '../../common/ComponentWithIcon/ComponentWithIcon';
import ButtonWithIcon from '../../common/ButtonWithIcon/ButtonWithIcon';
import {InfoCardProps} from './types';
import {Profile} from '../../../models/types';

const InfoCard: React.FC<InfoCardProps> = ({editable = false}) => {
  const fullName = useSelector(selectFullName);
  const status = useSelector(selectStatus);
  const contacts = useSelector(selectContacts);
  const lookingForAJob = useSelector(selectLookingForAJob);
  const lookingForAJobDescription = useSelector(selectLookingForAJobDescription);
  const aboutMe = useSelector(selectAboutMe);
  const contactLabels = useSelector(selectContactLabels);
  const fetchingStatus = useSelector(selectFetchingStatus);
  const updating = useSelector(selectUpdating);

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const showAboutMe = (): JSX.Element => (
    aboutMe ? (<pre>{aboutMe}</pre>) : (<p className="text-secondary">Empty...</p>)
  );

  const editHandler = useCallback(() => setEditMode(true), [setEditMode]);

  const submitHandler = useCallback(async (profile: Profile): Promise<any> => {
    try {
      await dispatch(updateProfile(profile));
      setEditMode(false);
    } catch (error) {
      return error;
    }
  }, [dispatch]);

  const updateStatusHandler = useCallback((status) => dispatch(updateStatus(status)), [dispatch]);

  const showEditButton = (): JSX.Element | '' => (
    editable
      ? (<ButtonWithIcon onClick={editHandler} icon={faEdit}>Edit</ButtonWithIcon>)
      : ''
  );

  const showBody = (): JSX.Element => (
    !editMode
      ? (
        <Card.Body>
          <Card.Text as="div">
            <h5><ComponentWithIcon icon={faAddressCard}>Contacts</ComponentWithIcon></h5>
            <ContactList contacts={contacts} labels={contactLabels}/>
          </Card.Text>
          <LookingForAJob answer={lookingForAJob} description={lookingForAJobDescription}/>
          <Card.Text as="div">
            <h5><ComponentWithIcon icon={faBook}>About me</ComponentWithIcon></h5>
            {showAboutMe()}
          </Card.Text>
          {showEditButton()}
        </Card.Body>
      )
      : (
        <Card.Body>
          <EditInfoForm onSubmit={submitHandler}
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
                setStatus={updateStatusHandler}
                fetching={fetchingStatus}/>
      </Card.Header>
      {showBody()}
    </Card>
  );
};

export default InfoCard;
