import {ThunkAction} from 'redux-thunk';
import {RootState} from '../../store/types';

export const SET_MESSAGES = 'social-network/chat/SET-MESSAGES';
export const SET_CONNECTED = 'social-network/chat/SET-CONNECTED';
export const SET_WS_ERROR = 'social-network/chat/SET-ERROR';
export const CLEAR_MESSAGES = 'social-network/chat/CLEAR-MESSAGES';
export const REPLACE_MESSAGES = 'social-network/chat/REPLACE-MESSAGES';

export const MAX_MESSAGES_LENGTH = 100;

export type SetMessagesAction = {
  type: typeof SET_MESSAGES;
  payload: {messages: ChatMessage[]};
};

export type SetConnectedAction = {
  type: typeof SET_CONNECTED;
  payload: {connected: boolean};
};

export type ClearMessagesAction = {
  type: typeof CLEAR_MESSAGES;
  payload: {
    messages: [];
  };
};

export type ReplaceMessagesAction = {
  type: typeof REPLACE_MESSAGES;
  payload: {
    messages: ChatMessage[];
  };
};

export type SetWsErrorAction = {
  type: typeof SET_WS_ERROR;
  payload: {
    wsError: boolean;
  };
};

export type ChatAction =
  | SetMessagesAction
  | SetConnectedAction
  | ClearMessagesAction
  | ReplaceMessagesAction
  | SetWsErrorAction;

export type ChatThunkAction = ThunkAction<void, RootState, unknown, ChatAction>;

export type ChatMessage = {
  id?: string;
  message: string;
  photo?: string;
  userId: number;
  userName: string;
};

export type ChatState = {
  messages: ChatMessage[];
  connected: boolean;
  wsError: boolean;
};
