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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./content.js":
/*!********************!*\
  !*** ./content.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function content() {\n    var dom = document.getElementById('root');\n    var content = document.createElement('div');\n    content.innerText = 'content';\n    dom.appendChild(content)\n}\n\n//ESModule\n// export default content\n\n// cmd\nmodule.exports = content;\n\n//# sourceURL=webpack:///./content.js?");

/***/ }),

/***/ "./header.js":
/*!*******************!*\
  !*** ./header.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function header() {\n    var dom = document.getElementById('root');\n    var header = document.createElement('div');\n    header.innerText = 'header';\n    dom.appendChild(header)\n}\n\n// ESModules\n// export default header\n\n// cmd\nmodule.exports = header;\n\n//# sourceURL=webpack:///./header.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// import Header from './header.js';\n// import Content from './content.js';\n// import Sidebar from './sidebar.js';\n\nvar Header = __webpack_require__(/*! ./header */ \"./header.js\")\nvar Content = __webpack_require__(/*! ./content */ \"./content.js\")\nvar Sidebar = __webpack_require__(/*! ./sidebar */ \"./sidebar.js\")\n\n\nnew Header();\nnew Content();\nnew Content();\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./sidebar.js":
/*!********************!*\
  !*** ./sidebar.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function sidebar() {\n    var dom = document.getElementById('root');\n    var sidebar = document.createElement('div');\n    sidebar.innerText = 'sidebar';\n    dom.appendChild(sidebar)\n}\n// ESModule\n// export default sidebar\n\n// cmd\nmodule.exports = sidebar;\n\n//# sourceURL=webpack:///./sidebar.js?");

/***/ })

/******/ });