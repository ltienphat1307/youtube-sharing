import { Mutation, Resolver, Ctx, Arg, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { YoutubeRepository } from "../../repositories/YoutubeRepository";
import { User } from "../../models/User";
import { Youtube } from "../../models/Youtube";
import { AppContext } from "../../types/AppContext";
import { ShareMovieInput } from "./shareVideo/ShareMovieInput";
import { IsLoggedIn } from "../../middlewares/isLoggedIn";
import { getYoutubeInfo } from "../../utils/youtubeUtils";

@Resolver((_type) => Youtube)
export class ShareMovie {
  constructor(
    @InjectRepository() private readonly youtubeRepository: YoutubeRepository
  ) {}

  @UseMiddleware(IsLoggedIn())
  @Mutation((_type) => Youtube)
  public async shareMovie(
    @Ctx() ctx: AppContext,
    @Arg("data") inputData: ShareMovieInput
  ): Promise<Youtube> {
    const user: User = ctx.res.locals.user;
    const youtubeInfo = await getYoutubeInfo(inputData.url);

    const youtube = this.youtubeRepository.create({
      videoId: youtubeInfo.videoId,
      title: youtubeInfo.title,
      description: youtubeInfo.description,
      sharedByUser: user,
    });

    return this.youtubeRepository.save(youtube);
  }
}
