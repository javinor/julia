/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(5)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_webgl_utils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_webgl_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_webgl_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shaders_julia_vertex_glsl__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shaders_julia_vertex_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__shaders_julia_vertex_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shaders_julia_fragment_glsl__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shaders_julia_fragment_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__shaders_julia_fragment_glsl__);






const prepareVertexPositions = (gl, program) => {
  const positions = [-1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, -1]
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const size = 2          // 2 components per iteration
  const type = gl.FLOAT   // the data is 32bit floats
  const normalize = false // don't normalize the data
  const stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0        // start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
  gl.enableVertexAttribArray(positionAttributeLocation)
}

/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor ({
    canvas,
    constant = {x: -0.706, y: -0.409},
    complexCenter = {x: 0, y: 0},
    xLength = 4
  } = {}) {
    const gl = this.gl = canvas.getContext('webgl')
    const program = this.program = __WEBPACK_IMPORTED_MODULE_0__utils_webgl_utils___default.a.createProgram(gl, __WEBPACK_IMPORTED_MODULE_1__shaders_julia_vertex_glsl___default.a, __WEBPACK_IMPORTED_MODULE_2__shaders_julia_fragment_glsl___default.a)
    this.constant = constant
    this.complexCenter = complexCenter
    this.xLength = xLength

    prepareVertexPositions(gl, program)
    gl.useProgram(program)
    this.render()
  }

  pan (pixelDeltaX, pixelDeltaY) {
    const pixelToDistanceRatio = this.xLength / this.gl.canvas.width
    this.complexCenter.x -= pixelDeltaX * pixelToDistanceRatio
    this.complexCenter.y += pixelDeltaY * pixelToDistanceRatio
    this.render()
  }

  zoom (multiplier) {
    this.xLength *= multiplier
    this.render()
  }

  changeConstant (pixelPoint) {
    const gl = this.gl
    const xLength = this.xLength

    const pixelToDistanceRatio = xLength / gl.canvas.width
    const yLength = xLength * gl.canvas.height / gl.canvas.width

    this.constant = {
      x: this.complexCenter.x + pixelPoint.x * pixelToDistanceRatio - xLength / 2,
      y: this.complexCenter.y + pixelPoint.y * pixelToDistanceRatio - yLength / 2
    }

    this.render()
  }

  render () {
    const gl = this.gl
    const program = this.program

    const constantUniformLocation = gl.getUniformLocation(program, 'constant')
    const centerUniformLocation = gl.getUniformLocation(program, 'complexCenter')
    const axisLengthsUniformLocation = gl.getUniformLocation(program, 'axisLengths')

    __WEBPACK_IMPORTED_MODULE_0__utils_webgl_utils___default.a.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const yLength = this.xLength * gl.canvas.height / gl.canvas.width
    gl.uniform2f(axisLengthsUniformLocation, this.xLength, yLength)
    gl.uniform2f(constantUniformLocation, this.constant.x, this.constant.y)
    gl.uniform2f(centerUniformLocation, this.complexCenter.x, this.complexCenter.y)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame

class Debouncer {
  constructor(callback) {
    this.callback = callback
    this.busy = false
  }

  exec(...args) {
    if (!this.busy) {
      requestAnimationFrame(() => {
        this.callback(...args)
        this.busy = false
      })
      this.busy = true
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Debouncer;



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "html, body {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  font-family: 'Inconsolata', monospace;\n}\n\ncanvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\nsection {\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  width: 300px;\n  padding: 0 20px 0 0;\n  border: 2px solid lightgrey;\n  border-radius: 12px;\n  background: rgba(250, 240, 230, 0.6);\n  pointer-events:none;\n}\n\nsection a { pointer-events: auto; }\n\n.noselect {\n  -webkit-touch-callout: none; /* iOS Safari */\n    -webkit-user-select: none; /* Safari */\n     -khtml-user-select: none; /* Konqueror HTML */\n       -moz-user-select: none; /* Firefox */\n        -ms-user-select: none; /* Internet Explorer/Edge */\n            user-select: none; /* Non-prefixed version, currently\n                                  supported by Chrome and Opera */\n}\n\nh1 { text-align: center;}\nh4 {\n  text-align: center;\n  margin: 0;\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
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

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
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

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "precision highp float;\n\nuniform vec2 constant;\nvarying vec2 complexPoint;\n\nvoid main() {\n  vec4 black = vec4(0, 0, 0, 1);\n  vec4 color = vec4(0, 0, 0, 1);\n\n  float iter = 0.0;\n  float x = complexPoint.x;\n  float y = complexPoint.y;\n  float tempX;\n  float tempY;\n\n  for (int i = 0; i < 1000; i++) {\n    iter += 1.0;\n    tempX = x * x - y * y;\n    tempY = 2.0 * x * y;\n\n    x = tempX + constant.x;\n    y = tempY + constant.y;\n\n    if (length(vec2(x,y)) > 4.0) break;\n  }\n\n  if (length(vec2(x,y)) > 4.0) {\n    iter -= log2(log2(length(vec2(x,y))));\n    // color.r = 0.5 + 0.50 * sin(iter);\n    // color.g = 0.5 + 0.25 * sin(iter);\n    // color.b = 0.5 - 0.25 * cos(iter);\n\n    color.r = 0.5 + 0.5 * sin(iter);\n    color.g = 0.5 + 0.5 * cos(iter);\n    color.b = 0.5 - 0.5 * sin(iter);\n    color.a = 1.0;\n\n    gl_FragColor = color;\n  } else {\n    gl_FragColor = black;\n  }\n}\n"

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\n\nuniform vec2 complexCenter;\nuniform vec2 axisLengths;\n\nvarying vec2 complexPoint;\n\nvoid main() {\n  gl_Position = vec4(a_position, 0, 1);\n  complexPoint = (a_position / 2.0) * axisLengths + complexCenter;\n}\n"

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_css__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__julia__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Debouncer__ = __webpack_require__(2);






const canvas = document.getElementById('julia')
const juliaConstantEl = document.getElementById('constant')
const julia = new __WEBPACK_IMPORTED_MODULE_1__julia__["a" /* default */]({
  canvas,
  complexCenter: {x: 0, y: 0},
  constant: JSON.parse(juliaConstantEl.innerText),
  xLength: 4
})

const debouncedRender = new __WEBPACK_IMPORTED_MODULE_2__utils_Debouncer__["a" /* default */](() => julia.render())
window.onresize = () => debouncedRender.exec()

const debouncedChangeConstant = new __WEBPACK_IMPORTED_MODULE_2__utils_Debouncer__["a" /* default */]((pixelPoint) => {
  julia.changeConstant(pixelPoint)
  juliaConstantEl.innerText = JSON.stringify(julia.constant, (key, value) => isNaN(value) ? value : value.toFixed(3))
})

const mouseMoveListener = (e) => debouncedChangeConstant.exec({x: e.clientX, y: e.clientY})
canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', mouseMoveListener))
canvas.addEventListener('mousedown', (e) => {
  debouncedChangeConstant.exec({x: e.clientX, y: e.clientY})
  canvas.addEventListener('mousemove', mouseMoveListener)
})

const debouncedKeyboardZoom = new __WEBPACK_IMPORTED_MODULE_2__utils_Debouncer__["a" /* default */]((multiplier) => julia.zoom(multiplier))
const debouncedKeyboardPan = new __WEBPACK_IMPORTED_MODULE_2__utils_Debouncer__["a" /* default */]((dx, dy) => julia.pan(dx, dy))
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a': debouncedKeyboardZoom.exec(0.9); break
    case 'z': debouncedKeyboardZoom.exec(1.1); break
    case 'ArrowUp': debouncedKeyboardPan.exec(0, 10); break
    case 'ArrowRight': debouncedKeyboardPan.exec(-10, 0); break
    case 'ArrowDown': debouncedKeyboardPan.exec(0, -10); break
    case 'ArrowLeft': debouncedKeyboardPan.exec(10, 0); break
  }
})


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) return shader

  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) return program

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

function resizeCanvasToDisplaySize(canvas, multiplier = 1) {
  const width  = canvas.clientWidth * multiplier | 0
  const height = canvas.clientHeight * multiplier | 0
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width  = width
    canvas.height = height
    return true
  }
  return false
}

module.exports = {
  createProgram,
  resizeCanvasToDisplaySize
}


/***/ })
/******/ ]);