import { Server as SocketSever, Socket } from "socket.io";

import { constants } from "../constants";
import { Movie } from "../models/Movie";

let io: SocketSever;

export const initSocket = (httpServer) => {
  io = new SocketSever(httpServer, {
    cors: { ...constants.corsConfig },
    cookie: true,
  });

  io.on("connection", (socket) => {
    console.log("User connected");
  });
};

export const sendSharedMovie = (movie: Movie) => {
  io.emit("send-shared-movie", movie);
};
