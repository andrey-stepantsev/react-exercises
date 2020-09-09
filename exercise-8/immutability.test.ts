import {
  Team,
  OriginalTeam,
  ExpectedTeam,
  SomeArray,
  originalArrayToExpectedArray,
  originalTeamToExpectedTeam1,
  originalTeamToExpectedTeam2,
} from "./immutability";

test("team to team", () => {
  const originalTeam: OriginalTeam = Object.freeze({
    size: 15,
    name: "Tampa Bay Roosters",
    league: "Minor",
  });

  const expectedTeam: ExpectedTeam = {
    name: "New York Badgers",
    league: "Minor",
    roster: 25,
  };

  expect(originalTeamToExpectedTeam1(originalTeam)).toEqual(expectedTeam);
});

test("array to array", () => {
  const originalArray: SomeArray = Object.freeze([1, 2, 3, 4]) as SomeArray;
  const expectedArray: SomeArray = ["two", 3, 4, 5];

  expect(originalArrayToExpectedArray(originalArray)).toEqual(expectedArray);
});

test("team to team deep", () => {
  const originalTeam: Team = Object.freeze({
    name: "Tampa Bay Roosters",
    captain: {
      name: "Bryan Downey",
      age: 27,
    },
  });

  const expectedTeam: Team = {
    name: "Tampa Bay Roosters",
    captain: {
      name: "Bryan Downey",
      age: 28,
    },
  };

  expect(originalTeamToExpectedTeam2(originalTeam)).toEqual(expectedTeam);
});
