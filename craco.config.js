const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
        require('postcss-normalize')(),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const lessRule = webpackConfig.module.rules.find(
        (rule) => rule.test && rule.test.toString().includes('less')
      );
      if (lessRule) {
        const lessLoaderIndex = lessRule.use.findIndex((loader) =>
          loader.loader.includes('less-loader')
        );
        if (lessLoaderIndex !== -1) {
          lessRule.use[lessLoaderIndex].options = {
            lessOptions: {
              modifyVars: getThemeVariables({
                dark: false, 
                compact: false, 
              }),
              javascriptEnabled: true,
            },
          };
        }
      }
      return webpackConfig;
    },
  },
};