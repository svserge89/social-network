import React, {useState, useEffect} from 'react';
import {Card, FormControl} from 'react-bootstrap';

import ComponentLoader from '../../../common/ComponentLoader/ComponentLoader';
import {StatusProps} from './types';

const Status: React.FC<StatusProps> = ({status, editable, setStatus, fetching}) => {
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => setLocalStatus(status), [status]);

  if (fetching) return (<ComponentLoader size="sm" center={false}/>);

  const onEdit = () => editable && setEditMode(true);

  const onChangeStatus = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => (
    setLocalStatus(value)
  );

  const onSetStatus = () => {
    if (localStatus !== status) setStatus(localStatus);

    setEditMode(false);
  };

  const onKeyDown = ({key}: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') onSetStatus();
  };

  if (editMode) {
    return (
      <FormControl value={localStatus}
                   onChange={onChangeStatus}
                   onBlur={onSetStatus}
                   onKeyDown={onKeyDown}
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
    <Card.Subtitle onDoubleClick={onEdit} className="text-nowrap text-truncate" title={localStatus}>
      {localStatus}
    </Card.Subtitle>
  );
};

export default Status;