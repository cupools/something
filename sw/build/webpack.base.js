const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    }, {
      test: /\.png$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1,
          name: '[name].[hash:6].[ext]'
        }
      }
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.[contenthash:6].css')
  ]
}
