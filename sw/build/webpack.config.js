const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')


module.exports = {
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
    new ExtractTextPlugin('style.[contenthash:6].css'),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'sw-demo',
      filename: 'sw.js',
      maximumFileSizeToCacheInBytes: 1024 * 1024,
      staticFileGlobsIgnorePatterns: [/\.html$/],
      minify: false,
      runtimeCaching: [{
        handler: 'cacheFirst',
        urlPattern: /[.]mp3$/
      }]
    })
  ]
}
