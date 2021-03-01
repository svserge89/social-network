import React from 'react';
import {Redirect} from 'react-router-dom';
import {Card, Row} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import cn from 'classnames';

import {useChatMessages} from '../../hooks/chat-messages';
import {useAutoScroll} from '../../hooks/auto-scroll';
import MessageCard from './MessageCard/MessageCard';
import MessageToolbar from './MessageToolbar/MessageToolbar';
import {selectUserId} from '../../selectors/auth';
import {LOGIN} from '../../utils/routes';

import style from './Chat.module.css';

const Chat: React.FC = () => {
  const currentUserId = useSelector(selectUserId);

  const {messages, loading, connected, sendMessage} = useChatMessages();
  const {anchorRef, onScroll} = useAutoScroll<HTMLDivElement>([messages]);

  if (!currentUserId) {
    return <Redirect to={LOGIN} />;
  }

  const showMessages = (): JSX.Element =>
    messages.length ? (
      <>
        {messages.map(({id, userId, userName, message, photo}) => (
          <MessageCard
            key={id}
            userId={userId}
            userName={userName}
            text={message}
            photo={photo}
            left={currentUserId === userId}
          />
        ))}
      </>
    ) : (
      <h4 className="text-light mx-auto">No messages...</h4>
    );

  return (
    <Row>
      <Card className={cn('col-12', 'mt-3', 'p-0', style.chat)}>
        <Card.Body
          className="overflow-auto d-flex flex-column p-3 bg-secondary"
          onScroll={onScroll}
        >
          {showMessages()}
          <div ref={anchorRef}></div>
        </Card.Body>
        <Card.Footer className="px-3 py-2">
          <MessageToolbar
            onSendMessage={sendMessage}
            disabled={loading || !connected}
            loading={loading}
          />
        </Card.Footer>
      </Card>
    </Row>
  );
};

export default Chat;
