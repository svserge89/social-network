import {
  ChatAction,
  ChatState,
  CLEAR_MESSAGES,
  MAX_MESSAGES_LENGTH,
  REPLACE_MESSAGES,
  ReplaceMessagesAction,
  SET_CONNECTED,
  SET_MESSAGES,
  SET_WS_ERROR,
  SetMessagesAction,
} from './types';
import {getMessagesLengthFilter} from '../../utils/chat';

const messageFilter = getMessagesLengthFilter(MAX_MESSAGES_LENGTH);

const changeData = (state: ChatState, {payload}: ChatAction) => ({
  ...state,
  ...payload,
});

const changeMessages = (state: ChatState, {payload}: SetMessagesAction) => ({
  ...state,
  messages: [...state.messages, ...payload.messages].filter(messageFilter),
});

const replaceMessages = (
  state: ChatState,
  {payload}: ReplaceMessagesAction
) => ({...state, messages: payload.messages.filter(messageFilter)});

const initialState: ChatState = {
  messages: [],
  connected: false,
  wsError: false,
};

const chatReducer = (state = initialState, action: ChatAction) => {
  switch (action.type) {
    case SET_MESSAGES:
      return changeMessages(state, action);
    case SET_CONNECTED:
    case SET_WS_ERROR:
    case CLEAR_MESSAGES:
      return changeData(state, action);
    case REPLACE_MESSAGES:
      return replaceMessages(state, action);
    default:
      return state;
  }
};

export default chatReducer;
