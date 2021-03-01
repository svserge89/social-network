export const SET_MESSAGES = 'social-network/chat/SET-MESSAGES';
export const SET_CONNECTED = 'social-network/chat/SET-CONNECTED';
export const SET_LOADING = 'social-network/chat/SET-LOADING';
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

export type SetLoadingAction = {
  type: typeof SET_LOADING;
  payload: {loading: boolean};
};

export type ClearMessagesAction = {
  type: typeof CLEAR_MESSAGES;
  payload: {
    messages: [];
    connected: false;
    loading: false;
  };
};

export type ReplaceMessagesAction = {
  type: typeof REPLACE_MESSAGES;
  payload: {
    messages: ChatMessage[];
  };
};

export type ChatAction =
  | SetMessagesAction
  | SetConnectedAction
  | SetLoadingAction
  | ClearMessagesAction
  | ReplaceMessagesAction;

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
  loading: boolean;
};
