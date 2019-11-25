import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import {compose} from 'redux';
import {Form, Card, Button, ButtonToolbar, Alert} from 'react-bootstrap';

import ContactInput from './ContactInput/ContactInput';
import LookingForAJobInput from './LookingForAJobInput/LookingForAJobInput';
import FullNameInput from './FullNameInput/FullNameInput';
import AboutMeInput from './AboutMeInput/AboutMeInput';

const EditInfoForm = ({
                        handleSubmit,
                        error,
                        reset,
                        setEditMode,
                        contactLabels,
                        lookingForAJobValue,
                        change
                      }) => {
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    if (error) setErrorMessage(error);
  }, [error, setErrorMessage]);

  const showContactInputs = () => (
    [...contactLabels.entries()].map(([key, value]) => (
      <ContactInput key={key}
                    label={value}
                    placeholder={`Enter ${value} profile link`}
                    name={`contacts.${key}`}/>
    ))
  );

  const showAlert = () => (errorMessage && (<Alert variant="danger">{errorMessage}</Alert>));

  const onCancel = () => setEditMode(false);

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert()}
      <Card.Text as="div">
        <FullNameInput name="fullName"/>
      </Card.Text>
      <Card.Text as="div">
        <Form.Label column={false}><h5>Contacts</h5></Form.Label>
        {showContactInputs()}
      </Card.Text>
      <Card.Text as="div" className="mt-3">
        <LookingForAJobInput checkboxName="lookingForAJob"
                             textareaName="lookingForAJobDescription"
                             checked={lookingForAJobValue}
                             change={change}/>
      </Card.Text>
      <Card.Text as="div">
        <AboutMeInput name="aboutMe"/>
      </Card.Text>
      <ButtonToolbar className="justify-content-between">
        <Button variant="success" type="submit">Save</Button>
        <Button variant="primary" type="reset" onClick={reset}>Clean</Button>
        <Button variant="danger" onClick={onCancel}>Cancel</Button>
      </ButtonToolbar>
    </Form>
  );
};

const selector = formValueSelector('profileInfo');

const mapStateToProps = (state) => ({
  lookingForAJobValue: selector(state, 'lookingForAJob'),
  initialValues: state.profile.profile
});

export default compose(connect(mapStateToProps), reduxForm({form: 'profileInfo'}))(EditInfoForm);