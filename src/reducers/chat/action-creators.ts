import {
  ChatMessage,
  CLEAR_MESSAGES,
  ClearMessagesAction,
  REPLACE_MESSAGES,
  ReplaceMessagesAction,
  SET_CONNECTED,
  SET_MESSAGES,
  SET_WS_ERROR,
  SetConnectedAction,
  SetMessagesAction,
  SetWsErrorAction,
} from './types';

export const setMessages = (messages: ChatMessage[]): SetMessagesAction => ({
  type: SET_MESSAGES,
  payload: {messages},
});

export const setConnected = (connected: boolean): SetConnectedAction => ({
  type: SET_CONNECTED,
  payload: {connected},
});

export const setWsError = (wsError: boolean): SetWsErrorAction => ({
  type: SET_WS_ERROR,
  payload: {wsError},
});

export const clearMessages = (): ClearMessagesAction => ({
  type: CLEAR_MESSAGES,
  payload: {messages: []},
});

export const replaceMessages = (
  messages: ChatMessage[]
): ReplaceMessagesAction => ({type: REPLACE_MESSAGES, payload: {messages}});
