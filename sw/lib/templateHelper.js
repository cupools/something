'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  include: function include(p) {
    var target = p.indexOf('$') === 0 ? _path2.default.join(__dirname, '..', p.slice(1)) : _path2.default.resolve(p);
    return _fs2.default.readFileSync(target, 'utf8');
  },
  stringify: function stringify(obj) {
    return JSON.stringify(obj).replace(/\\/g, '\\\\');
  }
};