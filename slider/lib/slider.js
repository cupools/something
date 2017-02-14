'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _preact = require('preact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slider = function (_Component) {
  (0, _inherits3.default)(Slider, _Component);

  function Slider(props) {
    (0, _classCallCheck3.default)(this, Slider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Slider.__proto__ || (0, _getPrototypeOf2.default)(Slider)).call(this, props));

    _this.threshold = 60;
    _this.startX = null;
    _this.startY = null;
    _this.endX = null;
    _this.endY = null;
    return _this;
  }

  (0, _createClass3.default)(Slider, [{
    key: '__onTouchstart',
    value: function __onTouchstart(e) {
      var touch = e.touches[0];
      this.startX = touch.pageX;
      this.startY = touch.pageY;
      this.endX = null;
      this.endY = null;
    }
  }, {
    key: '__onTouchmove',
    value: function __onTouchmove(e) {
      var touch = e.touches[0];
      this.endX = touch.pageX;
      this.endY = touch.pageY;
      e.preventDefault();
    }
  }, {
    key: '__onTouchend',
    value: function __onTouchend() {
      // just a tap, should be ignored
      if (!this.endX) {
        return;
      }

      var props = this.props;

      var offsetY = this.startY - this.endY;

      if (props.onB2T && offsetY > this.threshold) {
        props.onB2T();
      } else if (props.onT2B && this.threshold < 0 - this.threshold) {
        props.onT2B();
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(ev) {
      var props = this.props;

      var hook = 'on' + ev.toUpperCase();

      if (props[hook]) {
        props[hook]();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'div',
        {
          className: this.props.className,
          onTouchstart: this.__onTouchstart.bind(this),
          onTouchmove: this.__onTouchmove.bind(this),
          onTouchend: this.__onTouchend.bind(this) },
        this.props.children
      );
    }
  }]);
  return Slider;
}(_preact.Component);

exports.default = Slider;