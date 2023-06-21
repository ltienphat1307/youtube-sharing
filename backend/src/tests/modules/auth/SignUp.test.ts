import "reflect-metadata";
import {
  getCustomRepository,
  useContainer,
  createConnection,
  getConnection,
} from "typeorm";
import { Container } from "typedi";

import { UserRepository } from "../../../repositories/UserRepository";
import { SignUp } from "../../../modules/auth/SignUp";
import { User } from "../../../models/User";

describe("Auth Module - Sign up", () => {
  let userRepository: UserRepository;
  let module;
  const mockedUser: User = {
    id: 1,
    email: "phat@gmail",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeAll(async () => {
    useContainer(Container);
    await createConnection();
    userRepository = getCustomRepository(UserRepository);
    module = new SignUp(userRepository);

    jest
      .spyOn(userRepository, "findOne")
      .mockImplementation(async (condition: any): Promise<User> => {
        if (condition.where.email == mockedUser.email) {
          return mockedUser;
        }

        return null;
      });

    jest
      .spyOn(userRepository, "create")
      .mockImplementation((condition): User => {
        return {
          email: condition.email,
          password: condition.password,
          id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
    jest
      .spyOn(userRepository, "save")
      .mockImplementation(async (condition): Promise<User> => {
        return {
          email: condition.email,
          password: condition.password,
          id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it("should throw error if email is existing", async () => {
    const data = { email: "phat@gmail", password: "12345678" };

    try {
      const user = await module.signUp(data);
      expect(user).toBeNull();
    } catch (ex) {
      expect(ex.message).toEqual(`Email ${data.email} already registered.`);
    }
  });

  it("should create user", async () => {
    const data = { email: "phat1@gmail", password: "12345678" };
    const user = await module.signUp(data);

    expect(user.email).toEqual(data.email);
  });
});
