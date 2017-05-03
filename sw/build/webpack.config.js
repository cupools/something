const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const SWPrecacheWebpackPlugin = require('../lib/plugin').default
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  entry: {
    index: './app/app.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[chunkhash:6].js',
    library: 'bundle',
    libraryTarget: 'umd',
    publicPath: '/',
    umdNamedDefine: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new SWPrecacheWebpackPlugin({
      sw: {
        actName: 'swdemo',
        cacheName: 'version0',
        scope: '/',
        downgrade: false,
        assets: null
      },
      output: 'dist/',
      fileIgnorePatterns: [],
      fileGlobsPatterns: []
    })
  ]
})
