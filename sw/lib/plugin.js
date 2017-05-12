'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _lodash = require('lodash.template');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.omit');

var _lodash4 = _interopRequireDefault(_lodash3);

var _templateHelper = require('./templateHelper');

var _templateHelper2 = _interopRequireDefault(_templateHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_OPTIONS = {
  sw: {
    actName: '',
    cacheName: '',
    scope: '/',
    downgrade: false,
    assets: null,
    urlPatterns: [{
      test: /^https?:\/\/cdnjs\.cloudfaure\.cn/,
      handler: 'cacheFirst'
    }]
  },
  output: '',
  fileIgnorePatterns: [],
  filePatterns: [],
  templates: {
    'manifest.json': _path2.default.join(__dirname, './tmpl/manifest.json'),
    'assets.json': _path2.default.join(__dirname, './tmpl/assets.json'),
    'sw.js': _path2.default.join(__dirname, './tmpl/sw.js')
  }
};

var Precache = function () {
  function Precache(opts) {
    _classCallCheck(this, Precache);

    this.__opts = opts;
    this.sw = {};
    this.options = {};
  }

  _createClass(Precache, [{
    key: 'configure',
    value: function configure(compiler, compilation) {
      var _opts = this.__opts,
          _opts$sw = _opts.sw,
          sw = _opts$sw === undefined ? {} : _opts$sw,
          options = _objectWithoutProperties(_opts, ['sw']);

      this.options = _extends({}, (0, _lodash4.default)(DEFAULT_OPTIONS, 'sw'), options);

      var assets = sw.assets || this.getAssets(compiler, compilation);
      var urlPatterns = [].concat(DEFAULT_OPTIONS.sw.urlPatterns).map(function (item) {
        return _extends({}, item, { test: item.test.source });
      });

      this.sw = _extends({}, DEFAULT_OPTIONS.sw, sw, { assets: assets, urlPatterns: urlPatterns });
    }
  }, {
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('after-emit', function (compilation, callback) {
        _this.configure(compiler, compilation);

        var done = function done() {
          return callback();
        };
        var error = function error(err) {
          return callback(err);
        };

        var output = _this.options.output;
        var outputFileSystem = compiler.outputFileSystem;


        _this.render().then(function (files) {
          return new Promise(function (resolve) {
            outputFileSystem.mkdirp(_path2.default.resolve(output), resolve.bind(null, files));
          });
        }).then(function (files) {
          var writeFile = function writeFile(file) {
            var filename = file.filename,
                content = file.content;

            var dist = _path2.default.join(output, filename);

            return new Promise(function (resolve) {
              outputFileSystem.writeFile(dist, content, resolve);
            });
          };
          return Promise.all(files.map(writeFile));
        }).then(done).catch(error);
      });
    }
  }, {
    key: 'getAssets',
    value: function getAssets(compiler, compilation) {
      var outputPath = compiler.outputPath;
      var publicPath = compiler.options.output.publicPath;
      var _options = this.options,
          fileIgnorePatterns = _options.fileIgnorePatterns,
          filePatterns = _options.filePatterns;

      var matchPattern = function matchPattern(p, url) {
        return p.length ? (0, _minimatch2.default)(url, p) : p.test(url);
      };

      return Object.keys(compilation.assets).map(function (f) {
        return _path2.default.join(outputPath, f);
      }).filter(function (url) {
        return !fileIgnorePatterns.some(function (p) {
          return p.test(url);
        });
      }).filter(function (url) {
        return filePatterns.every(function (p) {
          return matchPattern(p, url);
        });
      }).map(function (f) {
        return publicPath + f.replace(outputPath + _path2.default.sep, '');
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var templates = this.options.templates;

      var renderContext = _extends({ options: (0, _lodash4.default)(this.sw, 'assets') }, this.sw, _templateHelper2.default);

      var ret = Object.keys(templates).reduce(function (mem, filename) {
        var filepath = templates[filename];
        var raw = _fs2.default.readFileSync(filepath, 'utf-8');
        var content = (0, _lodash2.default)(raw)(renderContext);

        return mem.concat({ filename: filename, content: content });
      }, []);

      return Promise.resolve(ret);
    }
  }]);

  return Precache;
}();

exports.default = Precache;