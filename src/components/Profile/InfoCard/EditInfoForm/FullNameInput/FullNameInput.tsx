import React from 'react';
import {Field} from 'react-final-form';
import {Form} from 'react-bootstrap';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';

import InputField from '../../../../common/InputField/InputField';
import ComponentWithIcon from '../../../../common/ComponentWithIcon/ComponentWithIcon';
import {FullNameInputProps} from './types';
import {compose} from '../../../../../utils/validators';

const FullNameInput: React.FC<FullNameInputProps> = ({
  name,
  validators,
  disabled = false,
}) => (
  <Form.Group>
    <Form.Label column={false}>
      <h5>
        <ComponentWithIcon icon={faUserEdit}>Full Name</ComponentWithIcon>
      </h5>
    </Form.Label>
    <Field name={name} validate={compose(validators)}>
      {({input, meta}) => (
        <InputField
          input={input}
          meta={meta}
          placeholder="Enter full name"
          autoComplete="on"
          type="text"
          disabled={disabled}
        />
      )}
    </Field>
  </Form.Group>
);

export default FullNameInput;
