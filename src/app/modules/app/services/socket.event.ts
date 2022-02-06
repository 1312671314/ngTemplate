import { SocketConstants } from './socket.constant';

export type SocketEvent = {
  eventType: SocketConstants;
  event: Event | CloseEvent | MessageEvent;
};
