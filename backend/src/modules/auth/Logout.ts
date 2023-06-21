import { Mutation, Resolver, Ctx } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { UserTokenRepository } from "../../repositories/UserTokenRepository";
import { setApiToken } from "../../utils/setApiToken";
import { AppContext } from "../../types/AppContext";

@Resolver((_type) => Boolean)
export class Logout {
  constructor(
    @InjectRepository() private readonly userTokenRepo: UserTokenRepository
  ) {}

  @Mutation((_type) => Boolean)
  public async logout(@Ctx() ctx: AppContext): Promise<boolean> {
    const apiToken: string = ctx.req.cookies["api-token"];

    if (!apiToken) {
      return false;
    }

    const userToken = await this.userTokenRepo.findOne({ where: { apiToken } });

    if (!userToken) {
      return false;
    }

    await this.userTokenRepo.remove(userToken);
    setApiToken(ctx.res, null);

    return true;
  }
}
