import React from 'react';
import {Field} from 'react-final-form';
import {Form} from 'react-bootstrap';
import {faBook} from '@fortawesome/free-solid-svg-icons';

import TextAreaField from '../../../../common/TextAreaField/TextAreaField';
import ComponentWithIcon from '../../../../common/ComponentWithIcon/ComponentWithIcon';
import {AboutMeInputProps} from './types';
import {compose} from '../../../../../utils/validators';

const AboutMeInput: React.FC<AboutMeInputProps> = ({name, validators, disabled = false}) => (
  <Form.Group>
    <Form.Label column={false}>
      <h5><ComponentWithIcon icon={faBook}>About me</ComponentWithIcon></h5>
    </Form.Label>
    <Field name={name} validate={compose(validators)}>
      {
        ({input, meta}) => (
          <TextAreaField rows={3} type="textarea" input={input} meta={meta} disabled={disabled}/>
        )
      }
    </Field>
  </Form.Group>
);

export default AboutMeInput;
