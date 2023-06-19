import React from "react";
import style from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import Header from "../components/Header";
import { ME } from "../apollo/graphql/useAuth";
import { IUser } from "../types/IUser";

import "./fonts.css";
import "./global.css";

const LayoutStyled = style.div`
  margin: auto;
  max-width: 1280px;
  min-height: calc(100vh - 248px);
`;

const Layout = ({ children }: { children: any }): any => {
  // const getMeResp = useQuery(ME, { fetchPolicy: "no-cache" });

  return (
    <>
      <Header />
      <LayoutStyled className="container">{children}</LayoutStyled>
    </>
  );
};

export default Layout;
