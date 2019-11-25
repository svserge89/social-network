import React, {useState, useEffect} from 'react';
import {Card, FormControl} from 'react-bootstrap';

import ComponentLoader from '../../../common/ComponentLoader/ComponentLoader';

const Status = ({status, editable, setStatus, fetching}) => {
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => setLocalStatus(status), [status]);

  if (fetching) return (<ComponentLoader size="sm" center={false}/>);

  const onEdit = () => editable && setEditMode(true);

  const onChangeStatus = ({target: {value}}) => setLocalStatus(value);

  const onSetStatus = ({target: {value}}) => {
    if (value !== status) setStatus(value);

    setEditMode(false);
  };

  if (editMode) {
    return (
      <FormControl value={localStatus}
                   onChange={onChangeStatus}
                   onBlur={onSetStatus}
                   placeholder="Input status"
                   autoFocus/>
    );
  }

  if (!status) {
    return (
      <Card.Subtitle onDoubleClick={onEdit} className="text-secondary">
        Status is not set.
      </Card.Subtitle>
    );
  }

  return (
    <Card.Subtitle onDoubleClick={onEdit} className="text-nowrap text-truncate">
      {localStatus}
    </Card.Subtitle>
  );
};

export default Status;