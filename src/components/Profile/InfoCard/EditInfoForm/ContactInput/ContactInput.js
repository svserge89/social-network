import React from 'react';
import {Form, Row, Col} from 'react-bootstrap';
import {Field} from 'redux-form';

import InputField from '../../../../common/InputField/InputField';

const ContactInput = ({label, placeholder, name, validators}) => (
  <Form.Group as={Row} className="my-1">
    <Form.Label column={true} xs={5} md={4} lg={3} className="font-weight-bold">{label}</Form.Label>
    <Col>
      <Field type="text"
             placeholder={placeholder}
             name={name}
             component={InputField}
             validate={validators}/>
    </Col>
  </Form.Group>
);

export default ContactInput;