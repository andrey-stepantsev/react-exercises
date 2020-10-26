import React from "react";
import { AppProps } from "next/app";
import { Global, css } from "@emotion/core";
import { wrapper } from "@/redux/store";

const styles = css`
  html,
  body {
    background-color: #e4e4e4;
    font-family: Roboto;
    margin: 0;
    min-height: 100vh;
    padding: 0;
  }

  body > div {
    display: flex;
    min-height: 100vh;
  }

  .material-icons {
    margin-bottom: 2px;
    margin-right: 10px;
  }
`;

const App: React.FC<AppProps> = ({ Component }) => (
  <>
    <Global styles={styles} />
    <Component />
  </>
);

export default wrapper.withRedux(App);
