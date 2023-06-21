import "reflect-metadata";
import {
  getCustomRepository,
  useContainer,
  createConnection,
  getConnection,
} from "typeorm";
import { Container } from "typedi";

import { UserTokenRepository } from "../../../repositories/UserTokenRepository";
import { UserRepository } from "../../../repositories/UserRepository";
import { Login } from "../../../modules/auth/Login";
import { User } from "../../../models/User";

describe("Auth Module - Login", () => {
  let userTokenRepository: UserTokenRepository;
  let userRepository: UserRepository;
  let module;
  const mockedUser = {
    id: 1,
    email: "phat@gmail",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeAll(async () => {
    useContainer(Container);
    await createConnection();
    userTokenRepository = getCustomRepository(UserTokenRepository);
    userRepository = getCustomRepository(UserRepository);
    module = new Login(userRepository, userTokenRepository);

    jest
      .spyOn(userRepository, "findOne")
      .mockImplementation(async (conditions: any): Promise<User | null> => {
        if (conditions.where.email != mockedUser.email) {
          return null;
        }

        return mockedUser;
      });
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it("should return error if user is not found", async () => {
    const ctx: any = { req: { cookies: {} } };
    const data = { email: "", password: "" };
    try {
      const user = await module.login(data, ctx);
      expect(user).toBeNull();
    } catch (ex) {
      expect(ex.message).toEqual("Wrong credentials");
    }
  });

  it("should return error if password does not match", async () => {
    const ctx: any = { req: { cookies: {} } };
    const data = { email: "phat@gmail", password: "12345678" };

    try {
      const user = await module.login(data, ctx);
      expect(user).toBeNull();
    } catch (ex) {
      expect(ex.message).toEqual("Wrong credentials");
    }
  });

  it("should login if credentials are ok", async () => {
    const ctx: any = { req: { cookies: {} } };
    const data = { email: "phat@gmail", password: "123456" };

    try {
      const user = await module.login(data, ctx);
      expect(user).toBeNull();
    } catch (ex) {
      expect(ex.message).toEqual("Wrong credentials");
    }
  });
});
