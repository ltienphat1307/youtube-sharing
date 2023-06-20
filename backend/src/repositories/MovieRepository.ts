import { EntityRepository, Repository } from "typeorm";
import { Movie } from "../models/Movie";
import { Mutation, Resolver, Ctx, Arg, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User } from "../models/User";
// import { ShareMovieInput } from "./shareVideo/ShareMovieInput";
// import { IsLoggedIn } from "../../middlewares/isLoggedIn";
import { getYoutubeInfo } from "../utils/youtubeUtils";
// import { sendSharedMovie } from "../../socket";

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  public async shareMovie(user: User, url: string): Promise<Movie> {
    // const user: User = ctx.res.locals.user;
    const youtubeInfo = await getYoutubeInfo(url);

    let movie = this.create({
      videoId: youtubeInfo.videoId,
      title: youtubeInfo.title,
      description: youtubeInfo.description,
      sharedByUser: user,
    });

    await this.save(movie);

    // fire notification
    // sendSharedMovie(movie);

    return movie;
  }
}
