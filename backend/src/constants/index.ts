import dotenv from "dotenv";
dotenv.config();

const corsOrigin = process.env.SERVER_CORS;

export const constants = {
  port: process.env.SERVER_PORT || 3000,
  socketPort: process.env.SOCKET_PORT || 3001,
  ggApiKey: process.env.GOOGLE_API_KEY,
  corsConfig: {
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    origin: [corsOrigin],
  },
};
