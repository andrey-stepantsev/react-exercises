import { compose, sortBy, prop, last, toPairs, map, join, concat, tail, split, fromPairs } from "ramda";

/* eslint-disable @typescript-eslint/ban-types */

type Pair = [string, string];

/* Задание 1 */
export type Team = { name: string; score: number };

const propName = prop("name");
const propScore = prop("score");
const sortByScore = sortBy(propScore);

export const getTopName = compose(propName, last, sortByScore);

/* Задание 2 */
export type QsObj = Record<string, string | number | boolean | object>;

const toParam = ([key, value]: Pair): string => `${key}=${value}`;
const mapToParams = map(toParam);
const joinParams = join("&");
const concatQuestionMark = concat("?");

export const createQs = compose(concatQuestionMark, joinParams, mapToParams, toPairs);

/* Задание 3 */
const paramsString = (qs: string) => tail(qs);
const toParams = split("&");
const toPair = split("=");
const mapToPairs = map(toPair);
const createObject = (pairs: Pair[]) => fromPairs(pairs);

export const parseQs = compose(createObject, mapToPairs, toParams, paramsString);
