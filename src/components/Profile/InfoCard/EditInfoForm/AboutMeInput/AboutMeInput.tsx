import React from 'react';
import {Form} from 'react-bootstrap';
import {Field} from 'redux-form';

import TextAreaField from '../../../../common/TextAreaField/TextAreaField';
import {AboutMeInputProps} from './types';

const AboutMeInput: React.FC<AboutMeInputProps> = ({name, validators, disabled = false}) => (
  <Form.Group>
    <Form.Label column={false}><h5>About me</h5></Form.Label>
    <Field type="textarea"
           name={name}
           rows={3}
           component={TextAreaField}
           validate={validators}
           disabled={disabled}/>
  </Form.Group>
);

export default AboutMeInput;