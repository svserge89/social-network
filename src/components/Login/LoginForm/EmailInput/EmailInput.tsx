import React from 'react';
import {Field} from 'react-final-form';
import {Form} from 'react-bootstrap';

import InputField from '../../../common/InputField/InputField';
import {EmailInputProps} from './types';
import {compose} from '../../../../utils/validators';

const EmailInput: React.FC<EmailInputProps> = ({
  name,
  validators,
  disabled = false,
}) => (
  <Form.Group>
    <Form.Label column={false}>Email address</Form.Label>
    <Field name={name} validate={compose(validators)}>
      {({input, meta}) => (
        <InputField
          input={input}
          meta={meta}
          placeholder="Enter email"
          type="email"
          disabled={disabled}
          autoComplete="on"
        />
      )}
    </Field>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
);

export default React.memo(EmailInput);
