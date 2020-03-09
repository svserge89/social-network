import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import {Form, Card, Button, ButtonToolbar, ButtonGroup, Alert} from 'react-bootstrap';

import ContactInput from './ContactInput/ContactInput';
import LookingForAJobInput from './LookingForAJobInput/LookingForAJobInput';
import FullNameInput from './FullNameInput/FullNameInput';
import AboutMeInput from './AboutMeInput/AboutMeInput';
import ButtonLoader from '../../../common/ButtonLoader/ButtonLoader';
import {selectProfile} from '../../../../selectors/profile';
import {
  EditInfoFormDispatchProps,
  EditInfoFormNonInjectedProps,
  EditInfoFormOwnProps,
  EditInfoFormProps,
  EditInfoFormStateProps
} from './types';
import {RootState} from '../../../../store/types';
import {Profile} from '../../../../models/types';

const EditInfoForm: React.FC<EditInfoFormProps> = ({
                                                     handleSubmit,
                                                     error,
                                                     reset,
                                                     setEditMode,
                                                     contactLabels,
                                                     lookingForAJobValue,
                                                     change,
                                                     updating
                                                   }) => {
  const showContactInputs = (): JSX.Element[] => (
    [...contactLabels.entries()].map(([key, value]) => (
      <ContactInput key={key}
                    label={value}
                    placeholder={`Enter ${value} profile link`}
                    name={`contacts.${key}`}
                    disabled={updating}/>
    ))
  );

  const showAlert = (): JSX.Element | '' => (error && (<Alert variant="danger">{error}</Alert>));

  const showSaveButton = (): JSX.Element => (
    updating ? (<ButtonLoader/>) : (<Button variant="success" type="submit">Save</Button>)
  );

  const handleCancel = useCallback(() => setEditMode(false), [setEditMode]);

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert()}
      <Card.Text as="div">
        <FullNameInput name="fullName" disabled={updating}/>
      </Card.Text>
      <Card.Text as="div">
        <Form.Label column={false}><h5>Contacts</h5></Form.Label>
        {showContactInputs()}
      </Card.Text>
      <Card.Text as="div" className="mt-3">
        <LookingForAJobInput checkboxName="lookingForAJob"
                             textareaName="lookingForAJobDescription"
                             checked={lookingForAJobValue}
                             change={change}
                             disabled={updating}/>
      </Card.Text>
      <Card.Text as="div">
        <AboutMeInput name="aboutMe" disabled={updating}/>
      </Card.Text>
      <ButtonToolbar className="justify-content-between">
        {showSaveButton()}
        <ButtonGroup>
          <Button variant="warning" type="reset" onClick={reset} disabled={updating}>Clean</Button>
          <Button variant="danger" onClick={handleCancel} disabled={updating}>Cancel</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Form>
  );
};

const selector = formValueSelector('profileInfo');

const mapStateToProps = (state: RootState): EditInfoFormStateProps => ({
  lookingForAJobValue: selector(state, 'lookingForAJob'),
  initialValues: selectProfile(state)
});

const formContainer = reduxForm<Profile, EditInfoFormNonInjectedProps>({form: 'profileInfo'});

const stateContainer = (
  connect<EditInfoFormStateProps, EditInfoFormDispatchProps, EditInfoFormOwnProps, RootState>(
    mapStateToProps
  )
);

export default stateContainer(formContainer(EditInfoForm));
