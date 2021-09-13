import React, {useCallback} from 'react';
import {FormControl} from 'react-bootstrap';
import cn from 'classnames';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

import ButtonWithIcon from '../../common/ButtonWithIcon/ButtonWithIcon';
import ButtonLoader from '../../common/ButtonLoader/ButtonLoader';
import {MessageToolbarProps} from './types';
import {useInput} from '../../../hooks/input';

import style from './MessageToolbar.module.css';

const MessageToolbar: React.FC<MessageToolbarProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const {value, setValue, onChange} = useInput<HTMLTextAreaElement>();

  const handleSendMessage = useCallback(() => {
    if (!value.trim()) {
      return;
    }

    onSendMessage(value);
    setValue('');
  }, [value, onSendMessage, setValue]);

  const handleAltEnterKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.code === 'Enter' && event.shiftKey) {
        if (!disabled) {
          event.preventDefault();
          handleSendMessage();
        }
      }
    },
    [handleSendMessage, disabled]
  );

  const showButton = (): JSX.Element =>
    disabled ? (
      <ButtonLoader noLabel={true} />
    ) : (
      <ButtonWithIcon
        icon={faPaperPlane}
        title="Send message"
        disabled={disabled || !value.trim()}
        onClick={handleSendMessage}
        variant="success"
      />
    );

  return (
    <div className="d-flex">
      <FormControl
        as="textarea"
        rows={2}
        className={cn('me-2', style.messageField)}
        value={value}
        onChange={onChange}
        placeholder="Input your message..."
        onKeyPress={handleAltEnterKeyPress}
      />
      {showButton()}
    </div>
  );
};

export default React.memo(MessageToolbar);
