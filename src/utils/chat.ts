import {ChatMessage} from '../reducers/chat/types';

export const getMessagesLengthFilter = (length: number) => {
  return (_: ChatMessage, index: number, messages: ChatMessage[]) =>
    index >= messages.length - length;
};
