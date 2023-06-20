import { io, Socket } from "socket.io-client";
import { constants } from "../constants";

let socket: Socket;

export const initSocket = () => {
  if (!socket) {
    console.log("initSocket");
    socket = io(constants.SOCKET_SERVER_URL);

    function onConnect() {
      console.log("connected");
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  }

  return socket;
};
