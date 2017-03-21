/*!
 * rem.js v0.0.1 2017-03-21
 * https://github.com/cupools/rem#readme
 */
!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("rem",[],n):"object"==typeof exports?exports.rem=n():t.rem=n()}(this,function(){return function(t){function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=37)}([function(t,n,e){t.exports=!e(1)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){var e=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,e){var r=e(14);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n,e){var r=e(6),o=e(5);t.exports=function(t){return r(o(t))}},function(t,n,e){t.exports={default:e(10),__esModule:!0}},function(t,n,e){e(36),t.exports=e(4).Object.assign},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){var r=e(3);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){var r=e(8),o=e(32),u=e(31);t.exports=function(t){return function(n,e,i){var c,f=r(n),a=o(f.length),s=u(i,a);if(t&&e!=e){for(;a>s;)if((c=f[s++])!=c)return!0}else for(;a>s;s++)if((t||s in f)&&f[s]===e)return t||s||0;return!t&&-1}}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var r=e(11);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){var r=e(3),o=e(2).document,u=r(o)&&r(o.createElement);t.exports=function(t){return u?o.createElement(t):{}}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,e){var r=e(2),o=e(4),u=e(15),i=e(20),c="prototype",f=function(t,n,e){var a,s,p,l=t&f.F,v=t&f.G,d=t&f.S,y=t&f.P,x=t&f.B,b=t&f.W,h=v?o:o[n]||(o[n]={}),m=h[c],g=v?r:d?r[n]:(r[n]||{})[c];v&&(e=n);for(a in e)(s=!l&&g&&void 0!==g[a])&&a in h||(p=s?g[a]:e[a],h[a]=v&&"function"!=typeof g[a]?e[a]:x&&s?u(p,r):b&&g[a]==p?function(t){var n=function(n,e,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,r)}return t.apply(this,arguments)};return n[c]=t[c],n}(p):y&&"function"==typeof p?u(Function.call,p):p,y&&((h.virtual||(h.virtual={}))[a]=p,t&f.R&&m&&!m[a]&&i(m,a,p)))};f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var r=e(23),o=e(28);t.exports=e(0)?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){t.exports=!e(0)&&!e(1)(function(){return 7!=Object.defineProperty(e(16)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){"use strict";var r=e(26),o=e(24),u=e(27),i=e(33),c=e(6),f=Object.assign;t.exports=!f||e(1)(function(){var t={},n={},e=Symbol(),r="abcdefghijklmnopqrst";return t[e]=7,r.split("").forEach(function(t){n[t]=t}),7!=f({},t)[e]||Object.keys(f({},n)).join("")!=r})?function(t,n){for(var e=i(t),f=arguments.length,a=1,s=o.f,p=u.f;f>a;)for(var l,v=c(arguments[a++]),d=s?r(v).concat(s(v)):r(v),y=d.length,x=0;y>x;)p.call(v,l=d[x++])&&(e[l]=v[l]);return e}:f},function(t,n,e){var r=e(12),o=e(21),u=e(34),i=Object.defineProperty;n.f=e(0)?Object.defineProperty:function(t,n,e){if(r(t),n=u(n,!0),r(e),o)try{return i(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n,e){var r=e(19),o=e(8),u=e(13)(!1),i=e(29)("IE_PROTO");t.exports=function(t,n){var e,c=o(t),f=0,a=[];for(e in c)e!=i&&r(c,e)&&a.push(e);for(;n.length>f;)r(c,e=n[f++])&&(~u(a,e)||a.push(e));return a}},function(t,n,e){var r=e(25),o=e(17);t.exports=Object.keys||function(t){return r(t,o)}},function(t,n){n.f={}.propertyIsEnumerable},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,e){var r=e(30)("keys"),o=e(35);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,n,e){var r=e(2),o="__core-js_shared__",u=r[o]||(r[o]={});t.exports=function(t){return u[t]||(u[t]={})}},function(t,n,e){var r=e(7),o=Math.max,u=Math.min;t.exports=function(t,n){return t=r(t),t<0?o(t+n,0):u(t,n)}},function(t,n,e){var r=e(7),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,n,e){var r=e(5);t.exports=function(t){return Object(r(t))}},function(t,n,e){var r=e(3);t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n,e){var r=e(18);r(r.S+r.F,"Object",{assign:e(22)})},function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(){var t=s.compute();return document.documentElement.style.fontSize=t+"px",t}function u(t){var n=null;t.addEventListener("resize",function(){clearTimeout(n),n=setTimeout(o,200)},!1)}function i(t,n,e){var r=f.default;return t&&r(s,{base:t}),n&&r(s,{convert:n}),r(s,{compute:(e===!0?function(t,n){return a.getBoundingClientRect().height/t*n}:e||s.compute).bind(null,s.base,s.convert)}),s.__inited||(u(window),r(s,{__inited:!0})),o()}Object.defineProperty(n,"__esModule",{value:!0});var c=e(9),f=r(c);n.default=i;var a=document.documentElement,s={__inited:!1,base:640,convert:100,compute:function(t,n){return a.getBoundingClientRect().width/t*n}}}])});