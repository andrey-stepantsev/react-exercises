import Router from "next/router";
import { NextPageContext } from "next";

export const redirect = ({ res }: NextPageContext, Location: string): void => {
  res ? res.writeHead(302, { Location }).end() : Router.push(Location);
};
