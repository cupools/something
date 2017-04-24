'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fs = require('fs');
var path = require('path');
var SWPrecache = require('sw-precache-webpack-plugin');

var Precache = function (_SWPrecache) {
  _inherits(Precache, _SWPrecache);

  function Precache() {
    _classCallCheck(this, Precache);

    return _possibleConstructorReturn(this, (Precache.__proto__ || Object.getPrototypeOf(Precache)).apply(this, arguments));
  }

  _createClass(Precache, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this2 = this;

      _get(Precache.prototype.__proto__ || Object.getPrototypeOf(Precache.prototype), 'apply', this).call(this, compiler);

      compiler.plugin('after-emit', function (compilation, callback) {
        var done = function done() {
          return callback();
        };
        var error = function error(err) {
          return callback(err);
        };
        _this2.writeExtendFiles(compiler).then(done, error);
      });
    }
  }, {
    key: 'writeExtendFiles',
    value: function writeExtendFiles(compiler) {
      var filepath = this.workerOptions.filepath;

      var tmpl = {
        'manifest.json': path.join(__dirname, './tmpl/manifest.json')
      };

      return Promise.all(Object.keys(tmpl).map(function (filename) {
        var target = tmpl[filename];
        var content = fs.readFileSync(target, 'utf8');
        var dist = path.join(filepath, '..', filename);
        return compiler.outputFileSystem.writeFile(dist, content);
      }));
    }
  }]);

  return Precache;
}(SWPrecache);

exports.default = Precache;