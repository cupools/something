const path = require('path')
const webpack = require('webpack')
const banner = require('./banner')
const pkg = require('../package.json')

module.exports = {
  entry: {
    index: path.resolve('src/index.js')
  },
  output: {
    filename: 'main.js',
    path: path.resolve('.'),
    library: pkg.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    }]
  },
  externals: Object.keys(pkg.dependencies),
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin(banner)
  ]
}
