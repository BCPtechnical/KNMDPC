import type { GatsbyNode } from 'gatsby';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.glb/,
          type: `asset/resource`,
        },
      ],
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};
