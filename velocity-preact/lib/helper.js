"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hookAniEnd = exports.correct = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends6 = require("babel-runtime/helpers/extends");

var _extends7 = _interopRequireDefault(_extends6);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var correct = function correct(material) {
  return (0, _keys2.default)(material).reduce(function (ret, stage) {
    return (0, _extends7.default)({}, ret, (0, _defineProperty3.default)({}, stage, (0, _keys2.default)(material[stage]).reduce(function (mem, item) {
      var _material$stage$item = material[stage][item],
          animation = _material$stage$item.animation,
          animationProperty = _material$stage$item.animationProperty,
          opts = (0, _objectWithoutProperties3.default)(_material$stage$item, ["animation", "animationProperty"]);

      var animations = [].concat(animation);
      var properties = animations.map(function (_, index) {
        return (0, _assign2.default)({}, opts, [].concat(animationProperty)[index]);
      });
      return (0, _extends7.default)({}, mem, (0, _defineProperty3.default)({}, item, {
        animation: animations,
        animationProperty: properties
      }));
    }, material[stage])));
  }, material);
};

exports.correct = correct;
var hookAniEnd = exports.hookAniEnd = function hookAniEnd(material, stage, callback) {
  if (!material[stage]) {
    return (0, _extends7.default)({}, material);
  }

  var items = material[stage];
  var info = (0, _keys2.default)(items).reduce(function (mem, key) {
    var item = items[key];
    var animationProperty = item.animationProperty;

    var _animationProperty$re = animationProperty.reduce(function (ret, item, index) {
      var _item$loop = item.loop,
          loop = _item$loop === undefined ? 1 : _item$loop,
          _item$duration = item.duration,
          duration = _item$duration === undefined ? 0 : _item$duration,
          _item$delay = item.delay,
          delay = _item$delay === undefined ? 0 : _item$delay;


      if (ret.loop) {
        return ret;
      } else if (loop === true) {
        return (0, _extends7.default)({}, ret, {
          loop: true
        });
      }
      return {
        spending: ret.spending + delay + duration * loop,
        index: index,
        loop: loop === true
      };
    }, {
      spending: 0,
      index: -1,
      loop: false
    }),
        spending = _animationProperty$re.spending,
        index = _animationProperty$re.index;

    return spending > mem.spending ? {
      keyName: key,
      index: index,
      spending: spending
    } : mem;
  }, {
    keyName: null,
    index: -1,
    spending: 0
  });

  if (!info.keyName) {
    return material;
  }

  var target = material[stage][info.keyName];
  return (0, _extends7.default)({}, material, (0, _defineProperty3.default)({}, stage, (0, _extends7.default)({}, material[stage], (0, _defineProperty3.default)({}, info.keyName, (0, _extends7.default)({}, target, {
    animationProperty: [].concat(target.animationProperty.slice(0, info.index), (0, _extends7.default)({}, target.animationProperty.slice(info.index)[0], {
      complete: callback
    }), target.animationProperty.slice(info.index + 1))
  })))));
};