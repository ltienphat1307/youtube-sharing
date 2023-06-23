import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { Login } from "../sections/Login";

const LoginPage: React.FC<PageProps> = () => {
  return <Login />;
};

export default LoginPage;

export const Head: HeadFC = () => <title>Login Page</title>;
