import { Response } from "express";

export const setApiToken = (res: Response, token: string) => {
  const tokenName = "api-token";

  res.cookie(tokenName, token, {
    httpOnly: true,
    // domain: process.env.NODE_ENV !== 'production' ? undefined : config.appDomain,
    sameSite: process.env.NODE_ENV !== "development" ? "none" : true,
    secure: process.env.NODE_ENV !== "development" ? true : false,
  });
};
