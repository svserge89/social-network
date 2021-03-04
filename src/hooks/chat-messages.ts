import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  selectConnected,
  selectMessages,
  selectWsError,
} from '../selectors/chat';
import {connect, disconnect} from '../reducers/chat/thunks';
import chatApi from '../api/chat';

export const useChatMessages = () => {
  const messages = useSelector(selectMessages);
  const connected = useSelector(selectConnected);
  const wsError = useSelector(selectWsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect());

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return {
    messages,
    connected,
    wsError,
    sendMessage: chatApi.sendMessage,
  };
};
