import { EntityRepository, Repository } from "typeorm";
import { UserToken } from "../models/UserToken";

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
  public async getUserByToken(apiToken?: string) {
    if (!apiToken) {
      return null;
    }

    const userToken = await this.findOne({
      where: { apiToken },
      relations: ["user"],
    });

    if (!userToken) {
      return null;
    }

    return userToken.user;
  }
}
