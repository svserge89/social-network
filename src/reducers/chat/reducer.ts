import {
  ChatAction,
  ChatState,
  CLEAR_MESSAGES,
  MAX_MESSAGES_LENGTH,
  REPLACE_MESSAGES,
  ReplaceMessagesAction,
  SET_CONNECTED,
  SET_LOADING,
  SET_MESSAGES,
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
  loading: false,
};

const chatReducer = (state = initialState, action: ChatAction) => {
  switch (action.type) {
    case SET_MESSAGES:
      return changeMessages(state, action);
    case SET_LOADING:
    case SET_CONNECTED:
    case CLEAR_MESSAGES:
      return changeData(state, action);
    case REPLACE_MESSAGES:
      return replaceMessages(state, action);
    default:
      return state;
  }
};

export default chatReducer;
