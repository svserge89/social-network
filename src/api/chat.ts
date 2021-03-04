import SocketWrapper, {EventType, EventListener} from '../utils/socket-wrapper';

const CHAR_WS_URL = process.env.REACT_APP_CHAT_WS;
const RECONNECT_TIMEOUT = 60000;
const RECONNECT_DELAY = 500;

let socketWrapper: SocketWrapper | null = null;

const chatApi = {
  connect: () => {
    if (!socketWrapper) {
      socketWrapper = new SocketWrapper(CHAR_WS_URL!, {
        reconnectTimeout: RECONNECT_TIMEOUT,
        reconnectDelay: RECONNECT_DELAY,
      });
    }
  },
  disconnect: () => {
    socketWrapper?.close();
    socketWrapper = null;
  },
  subscribe: (type: EventType, subscriber: EventListener) => {
    socketWrapper?.addEventListener(type, subscriber);
  },
  sendMessage: (message: string) => {
    socketWrapper?.sendMessage(message);
  },
};

export default chatApi;
