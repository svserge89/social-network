import React, {useCallback} from 'react';
import {Form as FinalForm} from 'react-final-form';
import {useSelector} from 'react-redux';
import {Form, Card, Button, ButtonToolbar, ButtonGroup, Alert} from 'react-bootstrap';

import ContactInput from './ContactInput/ContactInput';
import LookingForAJobInput from './LookingForAJobInput/LookingForAJobInput';
import FullNameInput from './FullNameInput/FullNameInput';
import AboutMeInput from './AboutMeInput/AboutMeInput';
import ButtonLoader from '../../../common/ButtonLoader/ButtonLoader';
import {selectProfile} from '../../../../selectors/profile';
import {EditInfoFormProps} from './types';

const EditInfoForm: React.FC<EditInfoFormProps> = ({
                                                     onSubmit,
                                                     setEditMode,
                                                     contactLabels,
                                                   }) => {
  const profile = useSelector(selectProfile);
  const showContactInputs = (updating: boolean): JSX.Element[] => (
    [...contactLabels.entries()].map(([key, value]) => (
      <ContactInput key={key}
                    label={value}
                    placeholder={`Enter ${value} profile link`}
                    name={`contacts.${key}`}
                    disabled={updating}/>
    ))
  );

  const showAlert = (error: string): JSX.Element | '' => (
    error && (<Alert variant="danger">{error}</Alert>)
  );

  const showSaveButton = (updating: boolean, disabled: boolean): JSX.Element => (
    updating
      ? (<ButtonLoader/>)
      : (<Button variant="success" type="submit" disabled={disabled}>Save</Button>)
  );

  const handleCancel = useCallback(() => setEditMode(false), [setEditMode]);

  return (
    <FinalForm onSubmit={onSubmit} initialValues={profile}>
      {
        ({handleSubmit, pristine, form, submitError, submitting, values}) => (
          <Form onSubmit={handleSubmit}>
            {showAlert(submitError)}
            <Card.Text as="div">
              <FullNameInput name="fullName" disabled={submitting}/>
            </Card.Text>
            <Card.Text as="div">
              <Form.Label column={false}><h5>Contacts</h5></Form.Label>
              {showContactInputs(submitting)}
            </Card.Text>
            <Card.Text as="div" className="mt-3">
              <LookingForAJobInput checkboxName="lookingForAJob"
                                   textareaName="lookingForAJobDescription"
                                   checked={values.lookingForAJob}
                                   disabled={submitting}/>
            </Card.Text>
            <Card.Text as="div">
              <AboutMeInput name="aboutMe" disabled={submitting}/>
            </Card.Text>
            <ButtonToolbar className="justify-content-between">
              {showSaveButton(submitting, pristine)}
              <ButtonGroup>
                <Button variant="warning"
                        type="reset"
                        onClick={form.reset}
                        disabled={pristine || submitting}>
                  Clean
                </Button>
                <Button variant="danger" onClick={handleCancel} disabled={submitting}>
                  Cancel
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Form>
        )
      }
    </FinalForm>
  );
};

export default EditInfoForm;
