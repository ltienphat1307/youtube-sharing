import React from "react";
import Layout from "./src/Layout";
import ApolloProvider from "./src/apollo/ApolloProvider";

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider>
      <Layout>{element}</Layout>
    </ApolloProvider>
  );
};
