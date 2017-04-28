'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');
var template = require('lodash.template');

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
    'manifest.json': path.join(__dirname, './tmpl/manifest.json'),
    'assets.json': path.join(__dirname, './tmpl/assets.json'),
    'sw.js': path.join(__dirname, '../dist/sw.js')
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


        var assets = _this.getAssets(compilation);
        var options = {
          globalOptions: globalOptions,
          assets: globalOptions.assets || assets
        };

        var output = options.output;
        var outputFileSystem = compiler.outputFileSystem;


        _this.render(options).then(function (files) {
          return new Promise(function (resolve) {
            outputFileSystem.mkdirp(path.resolve(output), resolve.bind(null, files));
          });
        }).then(function (files) {
          var writeFile = function writeFile(file) {
            var filename = file.filename,
                content = file.content;

            var dist = path.join(output, filename);
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
    value: function getAssets(compilation) {
      var _options = this.options,
          fileIgnorePatterns = _options.fileIgnorePatterns,
          fileGlobsPatterns = _options.fileGlobsPatterns;

      return Object.keys(compilation).filter(function (url) {
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
        var raw = fs.readFileSync(filepath, 'utf-8');
        var content = template(raw)(options);

        return mem.concat({ filename: filename, content: content });
      }, []);

      return Promise.resolve(ret);
    }
  }]);

  return Precache;
}();

exports.default = Precache;