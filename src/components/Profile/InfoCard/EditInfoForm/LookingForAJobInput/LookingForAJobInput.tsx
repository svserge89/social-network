import React from 'react';
import {Form} from 'react-bootstrap';
import {Field} from 'redux-form';

import TextAreaField from '../../../../common/TextAreaField/TextAreaField';
import {LookingForAJobInputProps} from './types';

const LookingForAJobInput: React.FC<LookingForAJobInputProps> = ({
                                                                   checkboxName,
                                                                   textareaName,
                                                                   checked,
                                                                   change,
                                                                   validators,
                                                                   disabled
                                                                 }) => {
  const onClick = () => change(checkboxName, !checked);

  return (
    <>
      <Form.Group>
        <Field type="checkbox"
               label={<h5>Looking for a job</h5>}
               name={checkboxName}
               component={Form.Check}
               defaultChecked={checked}
               onClick={onClick}
               disabled={disabled}/>
      </Form.Group>
      <Form.Group>
        <Field type="textarea"
               name={textareaName}
               rows={3}
               component={TextAreaField}
               disabled={!checked || disabled}
               validate={validators}/>
      </Form.Group>
    </>
  );
};

export default LookingForAJobInput;