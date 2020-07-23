import React from 'react';
import {Field} from 'react-final-form';
import {Form, Row, Col} from 'react-bootstrap';

import InputField from '../../../../common/InputField/InputField';
import ComponentWithIcon from '../../../../common/ComponentWithIcon/ComponentWithIcon';
import {ContactInputProps} from './types';
import {compose} from '../../../../../utils/validators';

const ContactInput: React.FC<ContactInputProps> = ({
  label,
  placeholder,
  name,
  icon,
  validators,
  disabled = false,
}) => (
  <Form.Group as={Row} className="my-1">
    <Form.Label column={true} xs={4} md={4} lg={3} className="font-weight-bold">
      <ComponentWithIcon icon={icon}>{label}</ComponentWithIcon>
    </Form.Label>
    <Col>
      <Field name={name} validate={compose(validators)}>
        {({input, meta}) => (
          <InputField
            input={input}
            meta={meta}
            placeholder={placeholder}
            autoComplete="on"
            type="text"
            disabled={disabled}
          />
        )}
      </Field>
    </Col>
  </Form.Group>
);

export default ContactInput;
