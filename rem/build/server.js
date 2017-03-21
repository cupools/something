const ip = require('ip')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const child = require('child_process')
const config = require('./webpack.prod.js')

new WebpackDevServer(webpack(config), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    noInfo: true,
    quiet: true,
    chunks: false
  }
}).listen(3000, err => {
  if (err) {
    log(err)
  } else {
    const host = `http://${ip.address()}:3000`
    log(`Listening at ${host}`)
    child.exec(`open ${host}/examples/index.html`)
  }
})

function log(...args) {
  console.log(...args) // eslint-disable-line no-console
}

