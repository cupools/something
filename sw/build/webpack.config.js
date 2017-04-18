const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './app/app.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    library: 'bundle',
    libraryTarget: 'umd',
    publicPath: '/',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.[contenthash].css'),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
}
