const webpackConfig = require('../build/webpack.prod')

module.exports = config => {
  config.set({
    basePath: '..',
    frameworks: ['mocha', 'chai-sinon'],
    reporters: ['mocha'],
    browsers: ['PhantomJS_Desktop'],
    customLaunchers: {
      PhantomJS_Desktop: {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 640,
            height: 1136
          }
        }
      }
    },
    files: [
      'test/*.test.js'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack'],
      '**/*.js': ['sourcemap']
    },
    // logLevel: config.LOG_DEBUG,
    client: {
      captureConsole: true,
      mocha: {
        timeout: 6000
      }
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
