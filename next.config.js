const isProd = (process.env.NODE_ENV || "production") === "production";

module.exports = {
  basePath: "/react-exercises",
  exportPathMap: () => ({
    "/": { page: "/" },
    "/game": { page: "/game" },
  }),
  assetPrefix: isProd ? "/react-exercises" : "",
};
