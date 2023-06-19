import dotenv from "dotenv";
dotenv.config();

export const constants = {
  port: process.env.PORT || 3000,
  ggApiKey: process.env.GOOGLE_API_KEY,
};
