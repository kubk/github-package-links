const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');

module.exports = env => {
  if (env === undefined || env.NODE_ENV === undefined) {
    throw new Error(
      'Environment variable NODE_ENV is required. Use --env.NODE_ENV=prod|dev to set NODE_ENV'
    );
  }

  const isProd = env.NODE_ENV === 'prod';
  console.log('NODE_ENV: ' + env.NODE_ENV);

  return {
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
    mode: isProd ? "production" : "development",
    optimization: {
      minimize: isProd
    },
    devtool: isProd ? false : 'source-map',
    plugins: isProd
      ? [
          new WrapperPlugin({
            test: /\.js$/,
            header: '(function () { "use strict";\n',
            footer: '\n})();'
          }),
          new UglifyJsPlugin({ extractComments: true })
        ]
      : [],
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    module: {
      rules: [
        { test: /\.ts?$/, loader: 'awesome-typescript-loader' },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
      ]
    }
  };
};
