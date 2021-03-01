import {
  ChatMessage,
  CLEAR_MESSAGES,
  ClearMessagesAction,
  REPLACE_MESSAGES,
  ReplaceMessagesAction,
  SET_CONNECTED,
  SET_LOADING,
  SET_MESSAGES,
  SetConnectedAction,
  SetLoadingAction,
  SetMessagesAction,
} from './types';

export const setMessages = (messages: ChatMessage[]): SetMessagesAction => ({
  type: SET_MESSAGES,
  payload: {messages},
});

export const setConnected = (connected: boolean): SetConnectedAction => ({
  type: SET_CONNECTED,
  payload: {connected},
});

export const setLoading = (loading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: {loading},
});

export const clearMessages = (): ClearMessagesAction => ({
  type: CLEAR_MESSAGES,
  payload: {messages: [], loading: false, connected: false},
});

export const replaceMessages = (
  messages: ChatMessage[]
): ReplaceMessagesAction => ({type: REPLACE_MESSAGES, payload: {messages}});
