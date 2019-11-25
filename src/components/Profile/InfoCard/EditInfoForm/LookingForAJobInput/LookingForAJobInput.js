import React from 'react';
import {Form} from 'react-bootstrap';
import {Field} from 'redux-form';

import TextAreaField from '../../../../common/TextAreaField/TextAreaField';

const LookingForAJobInput = ({checkboxName, textareaName, checked, change, validators}) => {
  const onClick = ({target: {checked}}) => {
    change(checkboxName, checked);

    if (!checked) change(textareaName, null);
  };

  return (
    <>
      <Form.Group>
        <Field type="checkbox"
               label={<h5>"Looking for a job"</h5>}
               name={checkboxName}
               component={Form.Check}
               defaultChecked={checked}
               onClick={onClick}/>
      </Form.Group>
      <Form.Group>
        <Field type="textarea"
               name={textareaName}
               rows={3}
               component={TextAreaField}
               disabled={!checked}
               validate={validators}/>
      </Form.Group>
    </>
  );
};

export default LookingForAJobInput;