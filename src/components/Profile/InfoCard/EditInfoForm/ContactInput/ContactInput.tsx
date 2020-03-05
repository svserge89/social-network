import React from 'react';
import {Form, Row, Col} from 'react-bootstrap';
import {Field} from 'redux-form';

import InputField from '../../../../common/InputField/InputField';
import {ContactInputProps} from './types';

const ContactInput: React.FC<ContactInputProps> = ({
                                                     label,
                                                     placeholder,
                                                     name,
                                                     validators,
                                                     disabled = false
                                                   }) => (
  <Form.Group as={Row} className="my-1">
    <Form.Label column={true} xs={4} md={4} lg={3} className="font-weight-bold">{label}</Form.Label>
    <Col>
      <Field type="text"
             placeholder={placeholder}
             name={name}
             component={InputField}
             validate={validators}
             disabled={disabled}/>
    </Col>
  </Form.Group>
);

export default ContactInput;