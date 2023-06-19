import { sign, verify } from "jsonwebtoken";
import { User } from "../../models/User";

const secret = process.env.API_TOKEN_SECRET || "api-token";

export const decodeToken = (token: string) => {
  return verify(token, secret);
};

interface UserTokenOptions {
  expiresIn?: string;
}

export const createUserToken = (user: User, options?: UserTokenOptions) => {
  const apiToken = sign({ id: user.id, email: user.email }, secret, {
    expiresIn: options?.expiresIn || "7d",
  });

  return apiToken;
};
