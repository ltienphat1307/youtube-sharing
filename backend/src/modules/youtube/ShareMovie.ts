import { Mutation, Resolver, Ctx, Arg, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { matches } from "class-validator";

import { MovieRepository } from "../../repositories/MovieRepository";
import { User } from "../../models/User";
import { Movie } from "../../models/Movie";
import { AppContext } from "../../types/AppContext";
import { ShareMovieInput } from "./shareVideo/ShareMovieInput";
import { IsLoggedIn } from "../../middlewares/isLoggedIn";
import { getYoutubeInfo } from "../../utils/youtubeUtils";
import { sendSharedMovie } from "../../socket";
import { ApolloError } from "apollo-server-express";

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
    const regex =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

    if (!matches(inputData.url, regex)) {
      throw new ApolloError("Please enter valid Youtube URL");
    }

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
