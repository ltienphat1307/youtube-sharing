import { Arg, Mutation, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ApolloError } from "apollo-server-express";

import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";
import { UserInput } from "./input/UserInput";
import { hashPassword } from "../../utils/passwordHandler";

@Resolver((_type) => User)
export class SignUp {
  constructor(
    @InjectRepository() private readonly userRepository: UserRepository
  ) {}

  @Mutation((_type) => User)
  public async signUp(@Arg("data") inputData: UserInput): Promise<User> {
    let user = await this.userRepository.findOne({ email: inputData.email });

    if (user) {
      throw new ApolloError(
        `Email ${inputData.email} already registered.`,
        "BAD_REQUEST"
      );
    }

    user = this.userRepository.create({
      email: inputData.email,
      password: await hashPassword(inputData.password),
    });
    user = await this.userRepository.save(user);

    return user;
  }
}
