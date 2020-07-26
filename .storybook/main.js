const custom = require("../webpack.config.js");

module.exports = {
  stories: [
    "../src/**/*.stories.tsx"
  ],
  addons: [
    "@storybook/addon-knobs/register", 
    "@storybook/addon-actions/register"
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        extensions: custom.resolve.extensions,
      },
      module: { 
        ...config.module, 
        rules: custom.module.rules 
      },
    };
  },
};
