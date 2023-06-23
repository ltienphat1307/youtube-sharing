import React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { SignUp } from "../sections/SignUp";

const SignUpPage: React.FC<PageProps> = () => {
  return <SignUp />;
};

export default SignUpPage;

export const Head: HeadFC = () => <title>Sign up Page</title>;
