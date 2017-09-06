/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * push class
 */
var Push = function () {
  /**
   * @constructor
   */
  function Push() {
    _classCallCheck(this, Push);

    /* Token to use for push notification */
    this._subscription = 0;
  }

  /**
   *  get push permission status
   */


  _createClass(Push, [{
    key: 'getPushPermissionStatus',
    value: function getPushPermissionStatus() {
      // query push permissions
      return new Promise(function (resolve, reject) {
        navigator.permissions.query({ name: 'push', userVisibleOnly: true }).then(function (permissionStatus) {
          console.log('push permission state is ', permissionStatus.state);
          resolve(permissionStatus.state);
        });
      });
    }

    /**
     * send push information to server
     */

  }, {
    key: 'registerPushSubscription',
    value: function registerPushSubscription(subscription) {
      this._subscription = subscription;
      var queryUrl = '/api/push/token/';
      var jsonSubscription = subscription.toJSON();

      var pushHeaders = new Headers({
        'Content-Type': 'application/json'
      });

      var pushData = JSON.stringify({
        // FIXME(daehyun): this userId should be replaced, now we use endpoint
        userId: jsonSubscription.endpoint,
        endpoint: jsonSubscription.endpoint,
        keys: jsonSubscription.keys
      });

      var pushRequest = new Request(queryUrl, {
        method: 'POST',
        headers: pushHeaders,
        body: pushData
      });

      fetch(pushRequest).then(function (response) {
        if (response.status !== 200) {
          console.log('Failed to fetch request. Status Code: ' + response.status);
        }
      }).catch(function (error) {
        console.log('Request failed: ' + error);
      });
      console.log('subscription registered :\n      ' + JSON.stringify(this._subscription));
    }
  }]);

  return Push;
}();

exports.default = Push;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * product class
 */
var Product = exports.Product = function () {
  /**
   * @constructor
   * @param {String} product name
   * @param {Int} product cost
   */
  function Product(name, cost) {
    _classCallCheck(this, Product);

    this._name = name;
    this._cost = cost;
  }

  /**
   * @return {String} name
   */


  _createClass(Product, [{
    key: 'name',
    get: function get() {
      return this._name;
    }

    /**
     * @return {Int} cost
     */

  }, {
    key: 'cost',
    get: function get() {
      return this._cost;
    }
  }]);

  return Product;
}();

/**
 * product decorator class
 */


var ProductOptionDeco = function (_Product) {
  _inherits(ProductOptionDeco, _Product);

  /**
   * @constructor
   * @param {product} base product
   * @param {String} product option name
   * @param {Int} product option cost
   */
  function ProductOptionDeco(product, name, cost) {
    _classCallCheck(this, ProductOptionDeco);

    var _this = _possibleConstructorReturn(this, (ProductOptionDeco.__proto__ || Object.getPrototypeOf(ProductOptionDeco)).call(this, name, cost));

    _this._product = product;
    return _this;
  }

  /**
   * @return {String} name
   */


  _createClass(ProductOptionDeco, [{
    key: 'name',
    get: function get() {
      return this._product.name + ' + ' + _get(ProductOptionDeco.prototype.__proto__ || Object.getPrototypeOf(ProductOptionDeco.prototype), 'name', this);
    }

    /**
     * @return {Int} cost
     */

  }, {
    key: 'cost',
    get: function get() {
      return this._product.cost + _get(ProductOptionDeco.prototype.__proto__ || Object.getPrototypeOf(ProductOptionDeco.prototype), 'cost', this);
    }
  }]);

  return ProductOptionDeco;
}(Product);

/**
 * product mandatory option class
 */


var MandatoryOption = exports.MandatoryOption = function (_ProductOptionDeco) {
  _inherits(MandatoryOption, _ProductOptionDeco);

  /**
   * @constructor
   * @param {product} base product
   * @param {String} product option name
   * @param {Int} product option cost
   */
  function MandatoryOption(product, name, cost) {
    _classCallCheck(this, MandatoryOption);

    return _possibleConstructorReturn(this, (MandatoryOption.__proto__ || Object.getPrototypeOf(MandatoryOption)).call(this, product, name, cost));
  }

  /**
   * @return {String} name
   */


  _createClass(MandatoryOption, [{
    key: 'name',
    get: function get() {
      return _get(MandatoryOption.prototype.__proto__ || Object.getPrototypeOf(MandatoryOption.prototype), 'name', this);
    }

    /**
     * @return {Int} cost
     */

  }, {
    key: 'cost',
    get: function get() {
      return _get(MandatoryOption.prototype.__proto__ || Object.getPrototypeOf(MandatoryOption.prototype), 'cost', this);
    }
  }]);

  return MandatoryOption;
}(ProductOptionDeco);

/**
 * product additional option class
 */


var AdditionalOption = exports.AdditionalOption = function (_ProductOptionDeco2) {
  _inherits(AdditionalOption, _ProductOptionDeco2);

  /**
   * @constructor
   * @param {product} base product
   * @param {String} product option name
   * @param {Int} product option cost
   */
  function AdditionalOption(product, name, cost) {
    _classCallCheck(this, AdditionalOption);

    return _possibleConstructorReturn(this, (AdditionalOption.__proto__ || Object.getPrototypeOf(AdditionalOption)).call(this, product, name, cost));
  }

  /**
   * @return {String} name
   */


  _createClass(AdditionalOption, [{
    key: 'name',
    get: function get() {
      return _get(AdditionalOption.prototype.__proto__ || Object.getPrototypeOf(AdditionalOption.prototype), 'name', this);
    }

    /**
     * @return {Int} cost
     */

  }, {
    key: 'cost',
    get: function get() {
      return _get(AdditionalOption.prototype.__proto__ || Object.getPrototypeOf(AdditionalOption.prototype), 'cost', this);
    }
  }]);

  return AdditionalOption;
}(ProductOptionDeco);

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var _push_manager = __webpack_require__(0);

var _push_manager2 = _interopRequireDefault(_push_manager);

var _push_key = __webpack_require__(7);

var _push_key2 = _interopRequireDefault(_push_key);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var push = new _push_manager2.default();

function urlBase64UrlToUint8Array(base64UrlData) {
  var padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
  var base64 = (base64UrlData + padding).replace(/\-/g, '+').replace(/_/g, '/');

  var rawData = window.atob(base64);
  var buffer = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i);
  }
  return buffer;
}

/**
 *  register service worker
 */
function registerServiceWorker() {
  navigator.serviceWorker.register('sw.js').then(function (serviceWorkerRegistration) {
    console.log('Service Worker Registration Success.');
    // Push Manager
    if ('PushManager' in window) {
      navigator.serviceWorker.ready.then(function () {
        var convertedVapidKey = urlBase64UrlToUint8Array(_push_key2.default.pushVapidKeys.publicKey);
        serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        }).then(function (pushSubscription) {
          push.registerPushSubscription(pushSubscription);
        }, function (error) {
          console.log(error);
        });
      });
    }
  }).catch(function (error) {
    console.error('Service Worker Registration Fail. ', error);
  });
}

/**
 * check service worker registered or not
 */
function isServiceWorkerRegistered() {
  return new Promise(function (resolve, reject) {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      console.log('isServiceWorkerRegistered' + registration);
      if (registration === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    Promise.resolve().then(push.getPushPermissionStatus).then(function (permission) {
      if (permission === 'granted') {
        Promise.resolve().then(isServiceWorkerRegistered).then(function (registerd) {
          console.log(' registerd  = ' + registerd);
          if (registerd == false) {
            registerServiceWorker();
          }
        });
      } else {
        // TODO(jimmy): need to notify users that should enable push permission for absolute
        console.log('permission is denied');
      }
    });
  });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(12)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);

__webpack_require__(4);

var _test = __webpack_require__(5);

var _test2 = _interopRequireDefault(_test);

var _push_manager = __webpack_require__(0);

var _push_manager2 = _interopRequireDefault(_push_manager);

var _product = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = document.querySelector('#root'); // Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var img = document.createElement('img');

root.innerHTML = '<p>Absolute Client!</p>';
img.src = _test2.default;
root.appendChild(img);

// Test code of product and option class
var coffee = new _product.Product('coffee', 3000);
var coffeeTallSize = new _product.MandatoryOption(coffee, 'tall size', 0);
var coffeeTallSizeIce = new _product.MandatoryOption(coffeeTallSize, 'ice', 500);
var coffeeTallSizeIceAddShot = new _product.AdditionalOption(coffeeTallSizeIce, 'shot', 300);

console.log(coffeeTallSizeIceAddShot.cost);
console.log(coffeeTallSizeIceAddShot.name);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'pushVapidKeys': {
    'publicKey': 'BIIRaJLExnx2i0LLD8ROMfWazpjE7dQJo6UQo9zqbqu-rNSJFK2tyKM1FykWvrJSi9062j3xurAovn3jmli7Fws'
  }
};

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, "/**\r\n * Copyright (c) 2017 The Absolute Authors.\r\n *\r\n * Licensed under the Apache License, Version 2.0 (the \"License\");\r\n * you may not use this file except in compliance with the License.\r\n * You may obtain a copy of the License at\r\n *\r\n *     http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing, software\r\n * distributed under the License is distributed on an \"AS IS\" BASIS,\r\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n * See the License for the specific language governing permissions and\r\n * limitations under the License.\r\n */\np {\n  color: #FF8C00; }\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ })
/******/ ]);