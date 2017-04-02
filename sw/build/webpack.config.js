const path = require('path')

module.exports = {
  entry: {
    index: './examples/app.js'
  },
  output: {
    filename: 'bundle.js',
    library: 'bundle',
    libraryTarget: 'umd',
    publicPath: '/examples/',
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
  }
}
