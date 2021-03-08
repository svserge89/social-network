import {v1 as uuid} from 'uuid';

import {ChatMessage, ChatThunkAction} from './types';
import chatApi from '../../api/chat';
import {
  clearMessages,
  replaceMessages,
  setConnected,
  setMessages,
  setWsError,
} from './action-creators';
import {handleError} from '../../utils/error-handler';
import {selectWsError} from '../../selectors/chat';

export const connect = (): ChatThunkAction => (dispatch, getState) => {
  try {
    let firstMessageEvent = false;

    chatApi.connect();
    chatApi.subscribe('open', () => {
      dispatch(setConnected(true));
      firstMessageEvent = true;

      if (selectWsError(getState())) {
        dispatch(setWsError(false));
      }
    });
    chatApi.subscribe('message', (event) => {
      const messages = (JSON.parse(
        event.data!
      ) as ChatMessage[]).map((message) => ({...message, id: uuid()}));

      if (firstMessageEvent) {
        dispatch(replaceMessages(messages));
        firstMessageEvent = false;
      } else {
        dispatch(setMessages(messages));
      }
    });
    chatApi.subscribe('close', () => {
      dispatch(setConnected(false));
    });
    chatApi.subscribe('error', (error) => {
      dispatch(setWsError(true));
    });
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const disconnect = (): ChatThunkAction => (dispatch) => {
  try {
    chatApi.disconnect();
    dispatch(clearMessages());
    dispatch(setConnected(false));
  } catch (error) {
    handleError(dispatch, error);
  }
};
