import { io } from 'socket.io-client';

let socket = null;

export function connectPromotionsWebSocket() {
  if (!socket) {
    const WS_BASE_URL =
      process.env.REACT_APP_WS_BASE_URL || 'http://localhost:5000';
    socket = io(`${WS_BASE_URL}/promotions`, {
      path: '/socket.io',
      withCredentials: true,
      transports: ['websocket'],
    });
  }
  return socket;
}

export function disconnectPromotionsWebSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
