import { Ctx, Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User } from "../../models/User";
import { UserTokenRepository } from "../../repositories/UserTokenRepository";
import { AppContext } from "../../types/AppContext";

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
