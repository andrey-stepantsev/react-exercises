module.exports = {
  transform: { "^.+\\.(js|jsx|ts|tsx)$": "babel-jest" },
  testEnvironment: "jsdom",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.settings.js"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: { "\\.(css)$": "<rootDir>/__mocks__/styleMock.js", "^@/(.*)$": "<rootDir>/src/$1" },
};
