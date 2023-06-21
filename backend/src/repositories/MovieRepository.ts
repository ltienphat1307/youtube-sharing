import { EntityRepository, Repository } from "typeorm";
import { Movie } from "../models/Movie";
import { User } from "../models/User";
import { getYoutubeInfo } from "../utils/youtubeUtils";

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  public async shareMovie(user: User, url: string): Promise<Movie> {
    const youtubeInfo = await getYoutubeInfo(url);

    let movie = this.create({
      videoId: youtubeInfo.videoId,
      title: youtubeInfo.title,
      description: youtubeInfo.description,
      sharedByUser: user,
    });

    await this.save(movie);

    return movie;
  }
}
