/* eslint-env mocha */

require('chai').should()
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const PrecachePlugin = require('../src/plugin').default
const baseConfig = require('../build/webpack.base')

describe('plugin', () => {
  it('should work', done => {
    const config = merge(baseConfig, {
      entry: {
        index: path.join(__dirname, './fixtures/app/app.js')
      },
      output: {
        path: path.join(__dirname, 'tmp'),
        filename: '[name].[chunkhash:6].js',
        publicPath: 'http://cdn.cn/assets/'
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, './fixtures/app/index.html')
        }),
        new PrecachePlugin({
          sw: {
            actName: 'swdemo',
            cacheName: 'version0',
            scope: '/',
            downgrade: false,
            assets: null
          },
          output: path.join(__dirname, './tmp/sw/'),
          fileIgnorePatterns: [],
          fileFreshPatterns: [/\.html$/],
          filePatterns: ['**/*.@(html|css|png)'],
          replacePublicPath: p => {
            if (/\.html$/.test(p)) return 'http://domain.cn/views/'
            return false
          }
        })
      ]
    })

    webpack(config).run(err => {
      done(err)
    })
  })
})
