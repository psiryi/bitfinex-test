import { eventChannel } from "redux-saga";

import {
  SOCKET_ADD_DATA,
  SOCKET_CONNECTED,
  SOCKET_ERROR,
  SOCKET_LOAD_DATA,
  SOCKET_RECONNECT,
} from "./constants";

const socketParams = {
  event: "subscribe",
  channel: "book",
  symbol: "tBTCUSD",
};

export default () => {
  let isClosedWithError = false;
  return eventChannel((emitter) => {
    const websocket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    websocket.onopen = () => {
      emitter({ type: SOCKET_CONNECTED });
      websocket.send(JSON.stringify(socketParams));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data instanceof Array && data[1] && data[1].length >= 50) {
        emitter({ type: SOCKET_LOAD_DATA, payload: data });
      } else if (data instanceof Array && data[1] && data[1].length === 3) {
        emitter({ type: SOCKET_ADD_DATA, payload: data });
      }
    };

    websocket.onerror = () => {
      isClosedWithError = true;
      emitter({ type: SOCKET_ERROR });
    };

    websocket.onclose = () => {
      if (!isClosedWithError) {
        setTimeout(() => {
          emitter({ type: SOCKET_RECONNECT });
        }, 1000);
      }
    };

    return () => {
      websocket.close();
    };
  });
};
