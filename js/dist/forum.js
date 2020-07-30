module.exports =
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./node_modules/escape-goat/index.js":
/*!*******************************************!*\
  !*** ./node_modules/escape-goat/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.htmlEscape = function (string) {
  return string.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

exports.htmlUnescape = function (htmlString) {
  return htmlString.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&#0?39;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
};

exports.htmlEscapeTag = function (strings) {
  var output = strings[0];

  for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
    output = output + exports.htmlEscape(String(i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1])) + strings[i + 1];
  }

  return output;
};

exports.htmlUnescapeTag = function (strings) {
  var output = strings[0];

  for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
    output = output + exports.htmlUnescape(String(i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1])) + strings[i + 1];
  }

  return output;
};

/***/ }),

/***/ "./node_modules/pupa/index.js":
/*!************************************!*\
  !*** ./node_modules/pupa/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! escape-goat */ "./node_modules/escape-goat/index.js"),
    htmlEscape = _require.htmlEscape;

module.exports = function (template, data) {
  if (typeof template !== 'string') {
    throw new TypeError("Expected a `string` in the first argument, got `" + typeof template + "`");
  }

  if (typeof data !== 'object') {
    throw new TypeError("Expected an `object` or `Array` in the second argument, got `" + typeof data + "`");
  }

  var doubleBraceRegex = /{{(.*?)}}/g;

  if (doubleBraceRegex.test(template)) {
    template = template.replace(doubleBraceRegex, function (_, key) {
      var result = data;

      for (var _iterator = key.split('.'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var property = _ref;
        result = result ? result[property] : '';
      }

      return htmlEscape(String(result));
    });
  }

  var braceRegex = /{(.*?)}/g;
  return template.replace(braceRegex, function (_, key) {
    var result = data;

    for (var _iterator2 = key.split('.'), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var property = _ref2;
      result = result ? result[property] : '';
    }

    return String(result);
  });
};

/***/ }),

/***/ "./src/forum/components/ShareModal.js":
/*!********************************************!*\
  !*** ./src/forum/components/ShareModal.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShareModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/string */ "flarum/utils/string");
/* harmony import */ var flarum_utils_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var pupa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pupa */ "./node_modules/pupa/index.js");
/* harmony import */ var pupa__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(pupa__WEBPACK_IMPORTED_MODULE_4__);






var shareUrls = {
  facebook: '//facebook.com/sharer/sharer.php?u={url}',
  twitter: '//twitter.com/share?url={url}&text={title}',
  linkedin: '//linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}',
  reddit: '//www.reddit.com/submit?url={url}&title={title}',
  whatsapp: 'whatsapp://send?text={title} {url}',
  vkontakte: '//vk.com/share.php?url={url}&title={title}&description={description}',
  odnoklassniki: '//connect.ok.ru/offer?url={url}',
  my_mail: '//connect.mail.ru/share?url={url}&title={title}&description={description}',
  qq: '//connect.qq.com/widget/shareqq/iframe_index.html?url={url}&title={title}',
  qzone: '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&summary={description}&title={title}'
};
var shareIcons = {
  vkontakte: 'fab fa-vk',
  my_mail: 'fas fa-at',
  qq: 'fab fa-qq',
  qzone: 'fas fa-star'
};

var ShareModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ShareModal, _Modal);

  function ShareModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = ShareModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

    this.networks = this.props.networks;
    this.discussion = this.props.discussion;
  };

  _proto.className = function className() {
    return 'FofShareSocialModal Modal--small';
  };

  _proto.title = function title() {
    return app.translator.trans('fof-share-social.forum.modal.title');
  };

  _proto.content = function content() {
    var url = encodeURIComponent(app.forum.attribute('baseUrl') + app.route('discussion', {
      id: this.discussion.id()
    }));
    var title = encodeURIComponent(app.title);
    var description = this.discussion.firstPost() ? encodeURIComponent(Object(flarum_utils_string__WEBPACK_IMPORTED_MODULE_3__["truncate"])(Object(flarum_utils_string__WEBPACK_IMPORTED_MODULE_3__["getPlainContent"])(this.discussion.firstPost().contentHtml()), 150, 0)) : '';
    var data = {
      url: url,
      title: title,
      description: description
    };
    var width = 1000;
    var height = 500;
    var top = $(window).height() / 2 - height / 2;
    var left = $(window).width() / 2 - width / 2;
    var windowParams = "width=" + width + ", height= " + height + ", top=" + top + ", left=" + left + ", status=no, scrollbars=no, resizable=no";
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form Form--centered"
    }, m("div", {
      className: "Form-group"
    }, this.networks.map(function (network) {
      return flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        className: "Button Button--rounded Button--block Share--" + network,
        icon: (shareIcons[network] || "fab fa-" + network) + " fa-lg fa-fw",
        children: app.translator.trans("fof-share-social.lib.networks." + network),
        onclick: function onclick() {
          return window.open(pupa__WEBPACK_IMPORTED_MODULE_4___default()(shareUrls[network], data), app.title, windowParams);
        }
      });
    }))));
  };

  return ShareModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/DiscussionPage */ "flarum/components/DiscussionPage");
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ShareModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ShareModal */ "./src/forum/components/ShareModal.js");




app.initializers.add('fof/share-social', function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'sidebarItems', function (items) {
    var _this = this;

    var prefix = 'fof-share-social.networks.';
    var networks = Object.keys(app.data).filter(function (k) {
      return k.startsWith('fof-share-social.networks.') && Number(app.data[k]);
    }).map(function (k) {
      return k.replace(prefix, '');
    });

    if (networks.length) {
      items.add('share-social', flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        className: 'Button Button-icon Button--share',
        icon: 'fas fa-share-alt',
        children: app.translator.trans('fof-share-social.forum.discussion.share_button'),
        onclick: function onclick() {
          return app.modal.show(new _components_ShareModal__WEBPACK_IMPORTED_MODULE_3__["default"]({
            networks: networks,
            discussion: _this.discussion
          }));
        }
      }), -1);
    }
  });
});

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/DiscussionPage":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionPage']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionPage'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/utils/string":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/string']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/string'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map