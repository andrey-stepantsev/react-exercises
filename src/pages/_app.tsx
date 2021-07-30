import React from "react";
import { AppProps } from "next/app";
import { Global, css } from "@emotion/core";
import { wrapper } from "@/redux/store";

const styles = css`
  html,
  body {
    color: #757575;
    background-color: #e4e4e4;
    font-family: Roboto;
    margin: 0;
    padding: 0;
  }

  body > div {
    display: flex;
    min-height: 100vh;
  }
`;

const App: React.FC<AppProps> = ({ Component }) => (
  <>
    <Global styles={styles} />
    <Component />
  </>
);

export default wrapper.withRedux(App);
