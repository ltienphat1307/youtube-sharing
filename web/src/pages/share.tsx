import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { ShareVideo } from "../sections/ShareVideo";

const ShareVideoPage: React.FC<PageProps> = () => {
  return <ShareVideo />;
};

export default ShareVideoPage;

export const Head: HeadFC = () => <title>Share video Page</title>;
