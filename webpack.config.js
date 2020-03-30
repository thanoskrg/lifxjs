const TerserPlugin = require('terser-webpack-plugin');

module.exports = env => {
  return {
    mode: env.production ? 'production' : 'development',
    entry: {
      'index': './index.js',
      'index.min': './index.js'
    },
    output: {
      filename: '[name].js'
    },
    optimization: {
      minimize: env.production,
      minimizer: [new TerserPlugin({
        include: /\.min/
      })]
    },
    watch: env.development,
    node: {
      fs: 'empty'
    }
  }
}