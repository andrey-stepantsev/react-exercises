import React from "react";
import { AppProps } from "next/app";
import { wrapper } from "@/redux/store";

const App: React.FC<AppProps> = ({ Component }) => <Component />;

export default wrapper.withRedux(App);
