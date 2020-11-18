import React from "react";
import { Cell } from "./Cell";

export default {
  title: "Cell",
};

export const Empty: React.FC = () => {
  return <Cell value={0} />;
};

export const Value: React.FC = () => {
  return <Cell value={2} />;
};
