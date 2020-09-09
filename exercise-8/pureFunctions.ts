/* eslint-disable @typescript-eslint/ban-types */

/* Задание 1 */
export type Team = { name: string; score: number };

const reducerTopTeam = (prevTeam: Team, currentTeam: Team): Team => {
  return prevTeam.score > currentTeam.score ? prevTeam : currentTeam;
};

export const getTopName = (teams: Team[]): string => {
  return teams.reduce(reducerTopTeam).name;
};

/* Задание 2 */
export type QsObj = Record<string, string | number | boolean | object>;

const toParam = ([key, value]): string => `${key}=${value}`;

export const createQs = (qsObj: QsObj): string => {
  return "?" + Object.entries(qsObj).map(toParam).join("&");
};

/* Задание 3 */
const toPair = (param: string): string[] => param.split("=");
const reducerPairs = (object: QsObj, [key, value]): QsObj => ({ ...object, [key]: value });

export const parseQs = (qs: string): QsObj => {
  return qs.slice(1).split("&").map(toPair).reduce(reducerPairs, {});
};
