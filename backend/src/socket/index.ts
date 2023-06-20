import { Server as SocketSever, Socket } from "socket.io";
import { matches } from "class-validator";
import { getCustomRepository } from "typeorm";

import { constants } from "../constants";
import { Movie } from "../models/Movie";
import { MovieRepository } from "../repositories/MovieRepository";
import { UserRepository } from "../repositories/UserRepository";

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
