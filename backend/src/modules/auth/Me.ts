import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User } from "../../models/User";
import { UserTokenRepository } from "../../repositories/UserTokenRepository";
import { AppContext } from "../../types/AppContext";
import { IsLoggedIn } from "../../middlewares/isLoggedIn";

@Resolver((_type) => User)
export class Me {
  constructor(
    @InjectRepository() private readonly userTokenRepo: UserTokenRepository
  ) {}

  @Query((_type) => User, { nullable: true })
  public async me(@Ctx() ctx: AppContext): Promise<User | null> {
    return this.userTokenRepo.getUserByToken(ctx.req.cookies["api-token"]);
  }
}
