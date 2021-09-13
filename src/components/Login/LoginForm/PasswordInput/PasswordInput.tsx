import React from 'react';
import {Field} from 'react-final-form';
import {Form} from 'react-bootstrap';

import InputField from '../../../common/InputField/InputField';
import {PasswordInputProps} from './types';
import {compose} from '../../../../utils/validators';

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  validators,
  disabled = false,
}) => (
  <Form.Group>
    <Form.Label column={false} className="mt-2">
      Password
    </Form.Label>
    <Field name={name} validate={compose(validators)}>
      {({input, meta}) => (
        <InputField
          input={input}
          meta={meta}
          placeholder="Password"
          autoComplete="off"
          type="password"
          disabled={disabled}
        />
      )}
    </Field>
  </Form.Group>
);

export default React.memo(PasswordInput);
