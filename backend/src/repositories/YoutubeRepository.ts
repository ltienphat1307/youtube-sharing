import { EntityRepository, Repository } from "typeorm";
import { Youtube } from "../models/Youtube";

@EntityRepository(Youtube)
export class YoutubeRepository extends Repository<Youtube> {}
