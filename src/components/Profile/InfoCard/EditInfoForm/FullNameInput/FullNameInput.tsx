import React from 'react';
import {Field} from 'react-final-form';
import {Form} from 'react-bootstrap';

import InputField from '../../../../common/InputField/InputField';
import {FullNameInputProps} from './types';
import {compose} from '../../../../../utils/validators';

const FullNameInput: React.FC<FullNameInputProps> = ({name, validators, disabled = false}) => (
  <Form.Group>
    <Form.Label column={false}><h5>Full Name</h5></Form.Label>
    <Field name={name} validate={compose(validators)}>
      {
        ({input, meta}) => (
          <InputField input={input}
                      meta={meta}
                      placeholder="Enter full name"
                      autoComplete="on"
                      type="text"
                      disabled={disabled}/>
        )
      }
    </Field>
  </Form.Group>
);

export default FullNameInput;
