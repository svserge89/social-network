import React from 'react';
import {Field} from 'react-final-form';
import {Form, Image} from 'react-bootstrap';

import InputField from '../../../common/InputField/InputField';
import {CaptchaInputProps} from './types';
import {compose} from '../../../../utils/validators';

const CaptchaInput: React.FC<CaptchaInputProps> = ({
  name,
  url,
  validators,
  disabled = false,
}) => (
  <Form.Group>
    <Form.Label column={false}>
      <Image src={url} thumbnail />
    </Form.Label>
    <Field name={name} validate={compose(validators)}>
      {({input, meta}) => (
        <InputField
          input={input}
          meta={meta}
          placeholder="Input symbols from image"
          autoComplete="off"
          type="text"
          disabled={disabled}
        />
      )}
    </Field>
  </Form.Group>
);

export default React.memo(CaptchaInput);
