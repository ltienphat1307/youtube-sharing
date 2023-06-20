import { Server as SocketSever } from "socket.io";
import { getCustomRepository } from "typeorm";

import { constants } from "../constants";
import { Movie } from "../models/Movie";
import { MovieRepository } from "../repositories/MovieRepository";
import { UserRepository } from "../repositories/UserRepository";

let io: SocketSever;

export const initSocket = (httpServer) => {
  const movieRepository = getCustomRepository(MovieRepository);
  const userRepository = getCustomRepository(UserRepository);

  io = new SocketSever(httpServer, {
    cors: { ...constants.corsConfig },
    cookie: true,
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("share-movie", async (data) => {
      const user = await userRepository.findOne(data.userId);
      const movie = await movieRepository.shareMovie(user, data.url);

      socket.broadcast.emit("send-shared-movie", movie);
    });
  });
};

export const sendSharedMovie = (movie: Movie) => {
  io.emit("send-shared-movie", movie);
};
