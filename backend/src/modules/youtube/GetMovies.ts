import { Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Movie } from "../../models/Movie";
import { MovieRepository } from "../../repositories/MovieRepository";

@Resolver((_type) => Movie)
export class GetMovies {
  constructor(
    @InjectRepository() private readonly movieRepository: MovieRepository
  ) {}

  @Query((_type) => [Movie])
  public async getMovies(): Promise<Movie[]> {
    const videos = await this.movieRepository.find({
      relations: ["sharedByUser"],
      order: {
        createdAt: "DESC",
      },
    });

    return videos;
  }
}
