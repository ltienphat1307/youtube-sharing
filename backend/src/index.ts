import "reflect-metadata";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import createSchema from "./schema";
import { constants } from "./constants";
import { initSocket } from "./socket";

const bootstrap = async () => {
  try {
    // register 3rd party IOC container
    TypeORM.useContainer(Container);

    // create TypeORM connection
    await TypeORM.createConnection();

    // build TypeGraphQL executable schema
    const schema = await createSchema(Container);

    const app = express();
    app.use(cors(constants.corsConfig));
    app.use(cookieParser());

    const httpServer = http.createServer(app);
    initSocket(httpServer);

    httpServer.listen(3001, () => {
      console.log("listening on *:3001");
    });

    // Create GraphQL server
    const graphqlServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      debug: true,
      playground: true,
    });
    graphqlServer.applyMiddleware({ app, cors: constants.corsConfig });

    const port = constants.port;
    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${graphqlServer.graphqlPath}`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
