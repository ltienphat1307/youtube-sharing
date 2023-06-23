import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { Layout } from "../layout";
import { Login } from "../sections/Login";

const LoginPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

export default LoginPage;

export const Head: HeadFC = () => <title>Login Page</title>;
