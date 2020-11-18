module.exports = {
  testRunner: "jest",
  coverageAnalysis: "off",
  mutate: ["src/**/*.ts", "!src/**/*.test.ts", "!src/redux/*", "!src/components/**/*"],
  timeoutMS: 60000,
  jest: { enableFindRelatedTests: false },
};
