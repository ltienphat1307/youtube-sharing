import { buildSchema } from "type-graphql";

import { Auth } from "./modules/auth";
import { Me } from "./modules/auth/Me";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [Me, ...Auth],
  });
};
