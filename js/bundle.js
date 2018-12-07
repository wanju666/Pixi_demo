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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module.js */ \"./js/module.js\");\n// test PIXI.JS //\r\n(function () {\r\n    let type = \"WebGL\";\r\n\r\n    if (!PIXI.utils.isWebGLSupported()) {\r\n        type = \"canvas\";\r\n    }\r\n\r\n    PIXI.utils.sayHello(type)\r\n})()\r\n\r\n\r\nObject(_module_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\r\n\r\nlet Application = PIXI.Application,\r\n    Container = PIXI.Container,\r\n    loader = PIXI.loader,\r\n    TextureCache = PIXI.utils.TextureCache,\r\n    resources = PIXI.loader.resources,\r\n    Sprite = PIXI.Sprite,\r\n    Rectangle = PIXI.Rectangle;\r\n\r\n\r\n// new PIXI实例 //\r\nlet app = new PIXI.Application({\r\n    width: 512,\r\n    height: 512\r\n});\r\n\r\ndocument.body.appendChild(app.view);\r\n\r\n// app.renderer.backgroundColor = 0x061639;\r\n\r\nloader\r\n    .add(\"images/treasureHunter.json\")\r\n    .load(setup);\r\n\r\nlet dungeon,\r\n    explorer,\r\n    treasure,\r\n    door,\r\n    id,\r\n    state;\r\n\r\nfunction setup () {\r\n    // dungeon //\r\n    let dungeonTexture = TextureCache[\"dungeon.png\"];\r\n    dungeon = new Sprite(dungeonTexture);\r\n    app.stage.addChild(dungeon);\r\n\r\n    // explorer //\r\n    explorer = new Sprite(\r\n        resources[\"images/treasureHunter.json\"].textures[\"explorer.png\"]\r\n    );\r\n    explorer.x = 68;\r\n    explorer.y = app.stage.height/2 - explorer.height/2;\r\n    // 给精灵创建 vx 和 vy 属性,然后给他们初始值;\r\n    explorer.vx = 0;\r\n    explorer.vy = 0;\r\n    app.stage.addChild(explorer);\r\n    \r\n    // 定义id使用与多个函数 //\r\n    id = resources[\"images/treasureHunter.json\"].textures;\r\n    \r\n    // treasure //\r\n    treasure = new Sprite(\r\n        id[\"treasure.png\"]\r\n    );\r\n    treasure.position.set(app.stage.width - treasure.width - 48, app.stage.height/2 - treasure.height/2);\r\n    app.stage.addChild(treasure);\r\n\r\n    // door //\r\n    door = new Sprite(\r\n        id[\"door.png\"]\r\n    )\r\n    door.position.set(32, 0);\r\n    app.stage.addChild(door);\r\n\r\n    // blobs //\r\n    let numberOfBlobs = 6,\r\n        spacing = 48,\r\n        xOffset = 150;\r\n    for (let i=0; i<numberOfBlobs; i++) {\r\n        let blob = new Sprite(id[\"blob.png\"]);\r\n        let x = spacing * i + xOffset;\r\n        let y = randomInt(32, app.stage.height - blob.height - 32);\r\n        blob.x = x;\r\n        blob.y = y;\r\n        app.stage.addChild(blob);\r\n    }\r\n\r\n    // 设置游戏状态 //\r\n    state = play;\r\n    // 游戏循环 //\r\n    app.ticker.add(delta => gameLoop(delta))\r\n    \r\n    \r\n}\r\n\r\nfunction gameLoop (delta) {\r\n    state(delta);\r\n}\r\n\r\nfunction play (delta) {\r\n    explorer.vx = 1;\r\n    explorer.vy = 1;\r\n\r\n    explorer.x += 1 + delta;\r\n    explorer.y += 1 + delta;\r\n}\r\n\r\n// 随机数工具函数 //\r\nfunction randomInt (min, max) {\r\n    return Math.floor(Math.random()*(max - min + 1) + min);\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./js/module.js":
/*!**********************!*\
  !*** ./js/module.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return bar; });\nfunction bar () {\r\n    console.log(1);\r\n}\n\n//# sourceURL=webpack:///./js/module.js?");

/***/ })

/******/ });