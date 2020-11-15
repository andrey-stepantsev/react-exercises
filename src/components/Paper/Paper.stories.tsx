import React from "react";
import { Paper } from ".";

export default {
  title: "Paper",
  parameters: {
    backgrounds: {
      default: "light-gray",
      values: [
        {
          name: "light-gray",
          value: "#eeeeee",
        },
      ],
    },
  },
};

export const Sample: React.FC = () => {
  return <Paper width="300px" height="300px" margin="25px" />;
};
