/* Задание 1 */
export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

export const originalTeamToExpectedTeam1 = (originalTeam: OriginalTeam): ExpectedTeam => {
  const { size, ...originalTeamWithoutSize } = originalTeam;
  const expectedTeam: ExpectedTeam = { ...originalTeamWithoutSize, name: "New York Badgers", roster: 25 };
  return expectedTeam;
};

/* Задание 2 */
export type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (originalArray: SomeArray): SomeArray => {
  const expectedArray: SomeArray = ["two", ...originalArray.slice(2), 5];
  return expectedArray;
};

/* Задание 3 */
export type Team = {
  name: string;
  captain: {
    name: string;
    age: number;
  };
};

export const originalTeamToExpectedTeam2 = (originalTeam: Team): Team => {
  const { captain: newCaptain } = originalTeam;
  newCaptain.age = 28;
  const expectedTeam: Team = { ...originalTeam, captain: newCaptain };
  return expectedTeam;
};
