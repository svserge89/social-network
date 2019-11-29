import React from 'react';
import {Form, Image} from 'react-bootstrap';
import {Field} from 'redux-form';

import InputField from '../../../common/InputField/InputField';

const CaptchaInput = ({name, url, validators, disabled}) => (
  <Form.Group>
    <Form.Label column={false}><Image src={url} thumbnail/></Form.Label>
    <Field type="text"
           placeholder="Input symbols from image"
           name={name}
           component={InputField}
           validate={validators}
           disabled={disabled}
           autoComplete="off"/>
  </Form.Group>
);

export default CaptchaInput;