import type { GatsbyConfig } from 'gatsby';
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config: GatsbyConfig = {
  siteMetadata: {
    title: `Khashayar Nattagh MD`,
    description: `Khashayar Nattagh MD`,
    author: `M Squared Studio`,
    siteUrl: `https://khashayarnattaghmd.com`,
    keywords: [
      `M-Squared Studio`,
      `Software Shop`,
      `M-Squared`,
      `Custom Websites`,
    ],
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `static/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        // eslint-disable-next-line n/no-path-concat
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },

    `gatsby-plugin-image`,
  ],
  jsxRuntime: `automatic`,
};

export default config;
