import { Ctx, Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Youtube } from "../../models/Youtube";
import { YoutubeRepository } from "../../repositories/YoutubeRepository";
import { AppContext } from "../../types/AppContext";

@Resolver((_type) => Youtube)
export class GetMovies {
  constructor(
    @InjectRepository() private readonly youtubeRepository: YoutubeRepository
  ) {}

  @Query((_type) => [Youtube])
  public async getMovies(@Ctx() ctx: AppContext): Promise<Youtube[]> {
    const videos = await this.youtubeRepository.find({
      relations: ["sharedByUser"],
      order: {
        createdAt: "DESC",
      },
    });

    return videos;
  }
}
