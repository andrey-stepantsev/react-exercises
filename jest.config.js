module.exports = {
  transform: { "^.+\\.(js|jsx|ts|tsx)$": "babel-jest" },
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  clearMocks: true,
  setupFiles: ["jest-date-mock"],
  setupFilesAfterEnv: ["<rootDir>/jest.settings.js"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: { "\\.(css)$": "<rootDir>/__mocks__/styleMock.js", "^@/(.*)$": "<rootDir>/src/$1" },
  modulePathIgnorePatterns: ["<rootDir>/.stryker-tmp"],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
