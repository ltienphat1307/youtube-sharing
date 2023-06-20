import { Mutation, Resolver, Ctx, Arg, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { MovieRepository } from "../../repositories/MovieRepository";
import { User } from "../../models/User";
import { Movie } from "../../models/Movie";
import { AppContext } from "../../types/AppContext";
import { ShareMovieInput } from "./shareVideo/ShareMovieInput";
import { IsLoggedIn } from "../../middlewares/isLoggedIn";
import { getYoutubeInfo } from "../../utils/youtubeUtils";
import { sendSharedMovie } from "../../socket";

@Resolver((_type) => Movie)
export class ShareMovie {
  constructor(
    @InjectRepository() private readonly movieRepository: MovieRepository
  ) {}

  @UseMiddleware(IsLoggedIn())
  @Mutation((_type) => Movie)
  public async shareMovie(
    @Ctx() ctx: AppContext,
    @Arg("data") inputData: ShareMovieInput
  ): Promise<Movie> {
    const user: User = ctx.res.locals.user;
    const youtubeInfo = await getYoutubeInfo(inputData.url);

    let movie = this.movieRepository.create({
      videoId: youtubeInfo.videoId,
      title: youtubeInfo.title,
      description: youtubeInfo.description,
      sharedByUser: user,
    });

    await this.movieRepository.save(movie);

    // fire notification
    sendSharedMovie(movie);

    return movie;
  }
}
