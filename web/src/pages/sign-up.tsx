import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { Layout } from "../layout";
import { SignUp } from "../sections/SignUp";

const SignUpPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <SignUp />
    </Layout>
  );
};

export default SignUpPage;

export const Head: HeadFC = () => <title>Sign up Page</title>;
