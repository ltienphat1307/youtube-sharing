import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { Layout } from "../layout";
import { Home } from "../sections/Home";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Home></Home>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
