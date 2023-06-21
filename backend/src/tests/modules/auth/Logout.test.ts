import "reflect-metadata";
import {
  getCustomRepository,
  useContainer,
  createConnection,
  getConnection,
} from "typeorm";
import { Container } from "typedi";

import { UserTokenRepository } from "../../../repositories/UserTokenRepository";
import { Logout } from "../../../modules/auth/Logout";
import { UserToken } from "../../../models/UserToken";

describe("Auth Module - Logout", () => {
  let userTokenRepository: UserTokenRepository;
  let module;
  const API_TOKEN = "token";

  beforeAll(async () => {
    useContainer(Container);
    await createConnection();
    userTokenRepository = getCustomRepository(UserTokenRepository);
    module = new Logout(userTokenRepository);

    jest
      .spyOn(userTokenRepository, "findOne")
      .mockImplementation(
        async (conditions: any): Promise<UserToken | null> => {
          if (
            !conditions.where.apiToken ||
            conditions.where.apiToken != API_TOKEN
          ) {
            return null;
          }

          const userToken = {
            id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            apiToken: "1",
            user: {
              id: 1,
              email: "john@example.com",
              password: "",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          };

          return userToken;
        }
      );

    module = new Logout(userTokenRepository);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it("should return false if there is no api key", async () => {
    const ctx: any = { req: { cookies: {} } };
    const data = { email: "", password: "" };

    const result = await module.logout(ctx);
    expect(result).toBe(false);
  });

  it("should return false if api key is wrong", async () => {
    const ctx: any = { req: { cookies: { "api-token": "test" } } };
    const result = await module.logout(ctx);
    expect(result).toBe(false);
  });

  it("should return true if api key is correct", async () => {
    const ctx: any = {
      req: { cookies: { "api-token": API_TOKEN } },
      res: { cookie: () => {} },
    };
    const result = await module.logout(ctx);
    expect(result).toBe(true);
  });
});
