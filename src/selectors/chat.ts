import {RootState} from '../store/types';
import {ChatMessage} from '../reducers/chat/types';

export const selectMessages = ({chat}: RootState): ChatMessage[] =>
  chat.messages;

export const selectConnected = ({chat}: RootState): boolean => chat.connected;

export const selectWsError = ({chat}: RootState): boolean => chat.wsError;
