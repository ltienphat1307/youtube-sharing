import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "cross-fetch/polyfill";
import "core-js";

import { constants } from "../constants";

const client = new ApolloClient({
  uri: constants.GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
  credentials: "include",
});

const AppApolloProvider = ({ children }: any) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AppApolloProvider;
