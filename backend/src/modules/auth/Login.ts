import { Arg, Mutation, Resolver, Ctx } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ApolloError } from "apollo-server-express";

import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";
import { UserTokenRepository } from "../../repositories/UserTokenRepository";
import { UserInput } from "./input/UserInput";
import { verifyPassword } from "../../utils/passwordHandler";
import { createUserToken } from "./auth";
import { setApiToken } from "../../utils/setApiToken";
import { AppContext } from "../../types/AppContext";

@Resolver((_type) => User)
export class Login {
  constructor(
    @InjectRepository() private readonly userRepository: UserRepository,
    @InjectRepository() private readonly userTokenRepo: UserTokenRepository
  ) {}

  @Mutation((_type) => User)
  public async login(
    @Arg("data") inputData: UserInput,
    @Ctx() ctx: AppContext
  ): Promise<User> {
    const user = await this.userRepository.findOne({ email: inputData.email });

    if (!user) {
      throw new ApolloError(`Wrong credentials`, "BAD_REQUEST");
    }

    const passwordVerified = await verifyPassword(
      inputData.password,
      user.password
    );

    if (!passwordVerified) {
      throw new ApolloError(`Wrong credentials`, "BAD_REQUEST");
    }

    const apiToken = createUserToken(user);
    const userToken = this.userTokenRepo.create({ apiToken });
    userToken.user = user;
    await this.userTokenRepo.save(userToken);

    setApiToken(ctx.res, apiToken);

    return user;
  }
}
