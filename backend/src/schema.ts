import { buildSchema } from "type-graphql";

import { Auth } from "./modules/auth";
import { YoutubeSchema } from "./modules/youtube/index";

const resolvers: any = [...Auth, ...YoutubeSchema];

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers,
  });
};
