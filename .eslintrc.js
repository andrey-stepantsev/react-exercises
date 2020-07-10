module.exports = {
  extends: [
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
  ],
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint",
  },
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto", printWidth: 120 }],
  },
  overrides: [
    {
      files: "webpack.config.js",
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
