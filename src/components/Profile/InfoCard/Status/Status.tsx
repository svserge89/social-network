import React, {useState, useEffect, useCallback} from 'react';
import {Card, FormControl} from 'react-bootstrap';

import ComponentLoader from '../../../common/ComponentLoader/ComponentLoader';
import {StatusProps} from './types';

const Status: React.FC<StatusProps> = ({
  status,
  editable,
  setStatus,
  fetching,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => setLocalStatus(status), [status]);

  const editStatusHandler = useCallback(() => editable && setEditMode(true), [
    editable,
  ]);

  const changeStatusHandler = useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLInputElement>) =>
      setLocalStatus(value),
    []
  );

  const updateStatusHandler = useCallback(() => {
    if (localStatus !== status) {
      setStatus(localStatus);
    }

    setEditMode(false);
  }, [localStatus, status, setStatus]);

  const keyDownHandler = useCallback(
    ({key}: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Enter') {
        updateStatusHandler();
      }
    },
    [updateStatusHandler]
  );

  if (fetching) {
    return <ComponentLoader size="sm" center={false} />;
  }

  if (editMode) {
    return (
      <FormControl
        value={localStatus}
        onChange={changeStatusHandler}
        onBlur={updateStatusHandler}
        onKeyDown={keyDownHandler}
        placeholder="Input status"
        autoFocus
      />
    );
  }

  if (!status) {
    return (
      <Card.Subtitle
        onDoubleClick={editStatusHandler}
        className="text-secondary"
      >
        Status is not set...
      </Card.Subtitle>
    );
  }

  return (
    <Card.Subtitle
      onDoubleClick={editStatusHandler}
      className="text-nowrap text-truncate"
      title={localStatus}
    >
      {localStatus}
    </Card.Subtitle>
  );
};

export default React.memo(Status);
