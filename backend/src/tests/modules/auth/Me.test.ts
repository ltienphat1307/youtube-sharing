import "reflect-metadata";
import {
  getCustomRepository,
  useContainer,
  createConnection,
  getConnection,
} from "typeorm";
import { Container } from "typedi";

import { UserTokenRepository } from "../../../repositories/UserTokenRepository";
import { Me } from "../../../modules/auth/Me";
import { UserToken } from "../../../models/UserToken";

describe("Auth Module - Get me", () => {
  const API_TOKEN = "token";
  let userTokenRepository: UserTokenRepository;
  let module;

  beforeAll(async () => {
    useContainer(Container);
    await createConnection();
    userTokenRepository = getCustomRepository(UserTokenRepository);

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

    module = new Me(userTokenRepository);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it("should return if user does not log in", async () => {
    const ctx: any = { req: { cookies: {} } };
    const user = await module.me(ctx);

    expect(user).toBeNull();
  });

  it("should return if user's token has been expired", async () => {
    const ctx: any = { req: { cookies: { "api-token": "test" } } };
    const user = await module.me(ctx);

    expect(user).toBeNull();
  });

  it("should get user by token", async () => {
    const ctx: any = { req: { cookies: { "api-token": API_TOKEN } } };
    const user = await module.me(ctx);

    expect(userTokenRepository.findOne).toHaveBeenCalled();
    expect(user.email).toEqual("john@example.com");
  });
});
