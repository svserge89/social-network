const RECONNECT_TIMEOUT = 300000;
const RECONNECT_DELAY = 500;

type SocketEvent = Event & {
  data?: string;
};

export type EventListener = (event: SocketEvent) => void;
export type EventType = 'open' | 'close' | 'message' | 'error';

type SocketWrapperOptions = {
  reconnectTimeout?: number;
  reconnectDelay?: number;
};

export default class SocketWrapper {
  private websocket: WebSocket | null = null;
  private readonly interval: any;
  private readonly openListeners: EventListener[] = [];
  private readonly messageListeners: EventListener[] = [];
  private readonly closeListeners: EventListener[] = [];
  private readonly errorListeners: EventListener[] = [];

  public constructor(
    private readonly url: string,
    private readonly options: SocketWrapperOptions
  ) {
    this.initSocket();

    this.interval = setInterval(() => {
      this.initSocket();
    }, options.reconnectTimeout ?? RECONNECT_TIMEOUT);
  }

  public close() {
    clearInterval(this.interval);

    this.websocket?.close();
    this.removeEventListeners();
  }

  public addEventListener(type: EventType, listener: EventListener) {
    switch (type) {
      case 'open':
        this.openListeners.push(listener);
        break;
      case 'close':
        this.closeListeners.push(listener);
        break;
      case 'message':
        this.messageListeners.push(listener);
        break;
      case 'error':
        this.errorListeners.push(listener);
        break;
      default:
        throw new Error('Incorrect event type');
    }
  }

  public removeEventListener(type: EventType, listener: EventListener) {
    let listeners: EventListener[] | null = null;

    switch (type) {
      case 'open':
        listeners = this.openListeners;
        break;
      case 'close':
        listeners = this.closeListeners;
        break;
      case 'message':
        listeners = this.messageListeners;
        break;
      case 'error':
        listeners = this.errorListeners;
        break;
      default:
        throw new Error('Incorrect event type');
    }

    const index = listeners.indexOf(listener);

    if (index === -1) {
      throw new Error('Listener does not exists');
    }

    listeners.splice(index, 1);
  }

  public sendMessage(message: string): void {
    this.websocket?.send(message);
  }

  private initSocket(): void {
    if (this.websocket) {
      this.websocket.close();

      const interval = setInterval(() => {
        if (this.websocket?.readyState === WebSocket.CLOSED) {
          clearInterval(interval);
          this.removeEventListeners();
          this.connect();
        }
      }, this.options.reconnectDelay ?? RECONNECT_DELAY);
    } else {
      this.connect();
    }
  }

  private connect() {
    this.websocket = new WebSocket(this.url);
    this.websocket.addEventListener('open', this.openListener);
    this.websocket.addEventListener('message', this.messageListener);
    this.websocket.addEventListener('close', this.closeListener);
    this.websocket.addEventListener('error', this.errorListener);
  }

  private removeEventListeners() {
    this.websocket?.removeEventListener('open', this.openListener);
    this.websocket?.removeEventListener('message', this.messageListener);
    this.websocket?.removeEventListener('close', this.closeListener);
    this.websocket?.removeEventListener('error', this.errorListener);
  }

  private openListener = (event: SocketEvent) => {
    this.openListeners.forEach((listener) => {
      listener(event);
    });
  };

  private messageListener = (event: SocketEvent) => {
    this.messageListeners.forEach((listener) => {
      listener(event);
    });
  };

  private closeListener = (event: SocketEvent) => {
    this.closeListeners.forEach((listener) => {
      listener(event);
    });
  };

  private errorListener = (event: SocketEvent) => {
    this.errorListeners.forEach((listener) => {
      listener(event);
    });
  };
}
