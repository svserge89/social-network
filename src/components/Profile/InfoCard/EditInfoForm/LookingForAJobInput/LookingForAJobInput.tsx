import React from 'react';
import {Field} from 'react-final-form';
import {Form} from 'react-bootstrap';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import TextAreaField from '../../../../common/TextAreaField/TextAreaField';
import ComponentWithIcon from '../../../../common/ComponentWithIcon/ComponentWithIcon';
import {LookingForAJobInputProps} from './types';
import {compose} from '../../../../../utils/validators';

const LookingForAJobInput: React.FC<LookingForAJobInputProps> = ({
                                                                   checkboxName,
                                                                   textareaName,
                                                                   checked,
                                                                   validators,
                                                                   disabled
                                                                 }) => {
  const showLabel = (): JSX.Element => (
    <h5><ComponentWithIcon icon={faSearch}>Looking for a job</ComponentWithIcon></h5>
  );

  return (
    <>
      <Form.Group>
        <Field name={checkboxName} type="checkbox">
          {
            ({input}) => (
              <Form.Check {...input}
                          type="checkbox"
                          label={showLabel()}
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
