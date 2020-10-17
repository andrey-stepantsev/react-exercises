import React from "react";
import { AppProps } from "next/app";
import { wrapper } from "@/redux/store";
import { Global, css } from "@emotion/core";

const styles = css`
  html,
  body {
    margin: 0;
    min-height: 100vh;
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
