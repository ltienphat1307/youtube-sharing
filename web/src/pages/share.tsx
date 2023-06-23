import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { Layout } from "../layout";
import { ShareVideo } from "../sections/ShareVideo";

const ShareVideoPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <ShareVideo />
    </Layout>
  );
};

export default ShareVideoPage;

export const Head: HeadFC = () => <title>Share video Page</title>;
