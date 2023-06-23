import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { Home } from "../sections/Home";

const IndexPage: React.FC<PageProps> = () => {
  return <Home></Home>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
