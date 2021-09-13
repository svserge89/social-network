import React, {useCallback} from 'react';
import {withTypes} from 'react-final-form';
import {useSelector} from 'react-redux';
import {Form, Card, ButtonToolbar, ButtonGroup, Alert} from 'react-bootstrap';
import {
  faAddressCard,
  faSave,
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';

import ContactInput from './ContactInput/ContactInput';
import LookingForAJobInput from './LookingForAJobInput/LookingForAJobInput';
import FullNameInput from './FullNameInput/FullNameInput';
import AboutMeInput from './AboutMeInput/AboutMeInput';
import ButtonLoader from '../../../common/ButtonLoader/ButtonLoader';
import ButtonWithIcon from '../../../common/ButtonWithIcon/ButtonWithIcon';
import ComponentWithIcon from '../../../common/ComponentWithIcon/ComponentWithIcon';
import {selectProfile} from '../../../../selectors/profile';
import {EditInfoFormProps} from './types';
import resolveBrandIcon from '../../../../utils/resolve-brand-icon';
import {Profile} from '../../../../models/types';

const {Form: FinalForm} = withTypes<Profile>();

const EditInfoForm: React.FC<EditInfoFormProps> = ({
  onSubmit,
  setEditMode,
  contactLabels,
}) => {
  const profile = useSelector(selectProfile);
  const showContactInputs = (updating: boolean): JSX.Element[] =>
    [...contactLabels.entries()].map(([key, value]) => (
      <ContactInput
        key={key}
        label={value}
        icon={resolveBrandIcon(key)}
        placeholder={`Enter ${value} profile link`}
        name={`contacts.${key}`}
        disabled={updating}
      />
    ));

  const showAlert = (error: string): JSX.Element | '' =>
    error && <Alert variant="danger">{error}</Alert>;

  const showSaveButton = (updating: boolean, disabled: boolean): JSX.Element =>
    updating ? (
      <ButtonLoader />
    ) : (
      <ButtonWithIcon
        variant="success"
        icon={faSave}
        type="submit"
        disabled={disabled}
      >
        Save
      </ButtonWithIcon>
    );

  const handleCancel = useCallback(() => setEditMode(false), [setEditMode]);

  return (
    <FinalForm onSubmit={onSubmit} initialValues={profile}>
      {({handleSubmit, pristine, form, submitError, submitting, values}) => (
        <Form onSubmit={handleSubmit}>
          {showAlert(submitError)}
          <Card.Text as="div">
            <FullNameInput name="fullName" disabled={submitting} />
          </Card.Text>
          <Card.Text as="div" className="mt-3">
            <Form.Label column={false}>
              <h5>
                <ComponentWithIcon icon={faAddressCard}>
                  Contacts
                </ComponentWithIcon>
              </h5>
            </Form.Label>
            {showContactInputs(submitting)}
          </Card.Text>
          <Card.Text as="div" className="mt-3">
            <LookingForAJobInput
              checkboxName="lookingForAJob"
              textareaName="lookingForAJobDescription"
              checked={values.lookingForAJob}
              disabled={submitting}
            />
          </Card.Text>
          <Card.Text as="div" className="mt-3">
            <AboutMeInput name="aboutMe" disabled={submitting} />
          </Card.Text>
          <ButtonToolbar className="justify-content-between mt-3">
            {showSaveButton(submitting, pristine)}
            <ButtonGroup>
              <ButtonWithIcon
                variant="warning"
                type="reset"
                icon={faUndo}
                onClick={() => form.reset()}
                disabled={pristine || submitting}
              >
                Clean
              </ButtonWithIcon>
              <ButtonWithIcon
                variant="danger"
                icon={faTimes}
                onClick={handleCancel}
                disabled={submitting}
              >
                Cancel
              </ButtonWithIcon>
            </ButtonGroup>
          </ButtonToolbar>
        </Form>
      )}
    </FinalForm>
  );
};

export default React.memo(EditInfoForm);
