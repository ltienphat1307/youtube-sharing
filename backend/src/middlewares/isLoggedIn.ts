import { AuthenticationError } from "apollo-server-express";
import { NextFunction, Request, Response } from "express";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { getCustomRepository } from "typeorm";

import { UserTokenRepository } from "../repositories/UserTokenRepository";
import { AppContext } from "./../types/AppContext";

const IsLoggedInFn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userTokenRepo = getCustomRepository(UserTokenRepository);
  const user = await userTokenRepo.getUserByToken(req.cookies["api-token"]);

  if (!user) {
    throw new AuthenticationError("Unauthorized");
  }

  res.locals.user = user;
  return next();
};

export const IsLoggedIn = (): MiddlewareFn<AppContext> => {
  return async ({ context: { req, res } }, next) => {
    return IsLoggedInFn(req, res, next);
  };
};
