import {useEffect, useRef} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import {
  selectConnected,
  selectLoading,
  selectMessages,
} from '../selectors/chat';
import {
  clearMessages,
  replaceMessages,
  setConnected,
  setLoading,
  setMessages,
} from '../reducers/chat/action-creators';
import {ChatMessage} from '../reducers/chat/types';

const CHAT_WEB_SOCKET_URL = process.env.REACT_APP_COMMON_CHAT_WS;

export const useChatMessages = () => {
  const afterOpen = useRef(false);
  const messages = useSelector(selectMessages);
  const connected = useSelector(selectConnected);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const {lastJsonMessage, sendMessage, readyState} = useWebSocket(
    CHAT_WEB_SOCKET_URL!,
    {
      shouldReconnect: () => true,
      share: true,
      retryOnError: true,
    }
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN && !connected) {
      dispatch(setConnected(true));
      afterOpen.current = true;
    } else if (readyState !== ReadyState.OPEN && connected) {
      dispatch(setConnected(false));
    }

    if (
      (readyState === ReadyState.CONNECTING ||
        readyState === ReadyState.CLOSING) &&
      !loading
    ) {
      dispatch(setLoading(true));
    } else if (
      readyState !== ReadyState.CONNECTING &&
      readyState !== ReadyState.CLOSING &&
      loading
    ) {
      dispatch(setLoading(false));
    }
  }, [readyState, connected, loading, dispatch]);

  useEffect(() => {
    if (lastJsonMessage) {
      const messages = (lastJsonMessage as ChatMessage[]).map((message) => ({
        ...message,
        id: uuid(),
      }));

      if (afterOpen.current) {
        dispatch(replaceMessages(messages));
        afterOpen.current = false;
      } else {
        dispatch(setMessages(messages));
      }
    }
  }, [lastJsonMessage, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  return {
    messages,
    connected,
    loading,
    sendMessage,
  };
};
