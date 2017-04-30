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

var _lodash = require('lodash.template');

var _lodash2 = _interopRequireDefault(_lodash);

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_OPTIONS = {
  globalOptions: {
    actName: '',
    cacheName: '',
    scope: '',
    downgrade: false,
    assets: null
  },
  output: 'dist/',
  fileIgnorePatterns: [],
  fileGlobsPatterns: [],
  templates: {
    'manifest.json': _path2.default.join(__dirname, './tmpl/manifest.json'),
    'assets.json': _path2.default.join(__dirname, './tmpl/assets.json')
  }
};

var Precache = function () {
  function Precache(opts) {
    _classCallCheck(this, Precache);

    this.options = Object.assign({}, DEFAULT_OPTIONS, opts);
  }

  _createClass(Precache, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('after-emit', function (compilation, callback) {
        var done = function done() {
          return callback();
        };
        var error = function error(err) {
          return callback(err);
        };
        var globalOptions = _this.options.globalOptions;


        var assets = _this.getAssets(compiler, compilation);
        var options = {
          globalOptions: globalOptions,
          assets: globalOptions.assets || assets
        };

        var output = _this.options.output;
        var outputFileSystem = compiler.outputFileSystem;


        _this.render(options).then(function (files) {
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
      var _options = this.options,
          fileIgnorePatterns = _options.fileIgnorePatterns,
          fileGlobsPatterns = _options.fileGlobsPatterns;


      return Object.keys(compilation).map(function (f) {
        return _path2.default.join(outputPath, f);
      }).filter(function (url) {
        return !fileIgnorePatterns.some(function (p) {
          return p.test(url);
        });
      }).filter(function (url) {
        return fileGlobsPatterns.every(function (p) {
          return p.test(url);
        });
      });
    }
  }, {
    key: 'render',
    value: function render(options) {
      var templates = this.options.templates;

      var ret = Object.keys(templates).reduce(function (mem, filename) {
        var filepath = templates[filename];
        var raw = _fs2.default.readFileSync(filepath, 'utf-8');
        var content = (0, _lodash2.default)(raw)(_extends({ options: options }, _helper2.default));

        return mem.concat({ filename: filename, content: content });
      }, []);

      return Promise.resolve(ret);
    }
  }]);

  return Precache;
}();

exports.default = Precache;