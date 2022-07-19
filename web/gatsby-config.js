// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const clientConfig = require("./config/client-config");
const mainConfig = require("../config");
const isProd = process.env.NODE_ENV === "production";
//export const pathPrefix = `/us`;


module.exports = {
  pathPrefix: `/smc`,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token: mainConfig.sanity.token,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        prettier: false,
        svgoConfig: {
          plugins: [
            { removeViewBox: false },
            { cleanupNumericValues: true },
            { prefixIds: true },
          ],
        },
      },
    }
  ],
};
