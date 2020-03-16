import React from 'react';
import {Field} from 'react-final-form';
import {Form} from 'react-bootstrap';

import TextAreaField from '../../../../common/TextAreaField/TextAreaField';
import {LookingForAJobInputProps} from './types';
import {compose} from '../../../../../utils/validators';

const LookingForAJobInput: React.FC<LookingForAJobInputProps> = ({
                                                                   checkboxName,
                                                                   textareaName,
                                                                   checked,
                                                                   validators,
                                                                   disabled
                                                                 }) => {
  return (
    <>
      <Form.Group>
        <Field name={checkboxName} type="checkbox">
          {
            ({input}) => (
              <Form.Check {...input}
                          type="checkbox"
                          label={<h5>Looking for a job</h5>}
                          disabled={disabled}/>
            )
          }
        </Field>
      </Form.Group>
      <Form.Group>
        <Field name={textareaName} validate={compose(validators)}>
          {
            ({input, meta}) => (
              <TextAreaField input={input}
                             meta={meta}
                             rows={3}
                             type="textarea"
                             disabled={!checked || disabled}/>
            )
          }
        </Field>
      </Form.Group>
    </>
  );
};

export default LookingForAJobInput;
