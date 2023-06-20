import React from "react";
import style from "styled-components";

import Header from "../components/Header";
import Toast from "../components/Toast";

import "./fonts.css";
import "./global.css";

const LayoutStyled = style.div`
  margin: auto;
  max-width: 1280px;
  min-height: calc(100vh - 248px);
`;

const Layout = ({ children }: { children: any }): any => {
  return (
    <>
      <Header />
      <LayoutStyled className="container">{children}</LayoutStyled>
      <Toast />
    </>
  );
};

export default Layout;
