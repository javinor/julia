'use strict'

const webglUtils = require('./webgl-utils')

const canvas = document.getElementById('mandelbrot')
const gl = canvas.getContext('webgl') // TODO debug

const mandelbrotShaders = require('./mandelbrotShaders')
const vertexShaderSource = mandelbrotShaders.vertexShaderSource
const fragmentShaderSource = mandelbrotShaders.fragmentShaderSource

const vertexShader = webglUtils.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = webglUtils.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
const program = webglUtils.createProgram(gl, vertexShader, fragmentShader)


const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
const colorUniformLocation = gl.getUniformLocation(program, 'u_color')


const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)


// three 2d points
// var positions = [
//   -1, -1,
//   -1, 1,
//   1, 1,
//   1, -1,
// ]
var positions = [
  10, 20,
  80, 20,
  10, 30,
  10, 30,
  80, 20,
  80, 30,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)



// RENDERING CODE
webglUtils.resizeCanvasToDisplaySize(gl.canvas)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
// Clear the canvas
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)

// Tell it to use our program (pair of shaders)
gl.useProgram(program)
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

gl.enableVertexAttribArray(positionAttributeLocation)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 2          // 2 components per iteration
var type = gl.FLOAT   // the data is 32bit floats
var normalize = false // don't normalize the data
var stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0        // start at the beginning of the buffer
gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset)

// var primitiveType = gl.TRIANGLES
// var offset = 0
// var count = 6
// gl.drawArrays(primitiveType, offset, count)

// draw 50 random rectangles in random colors
for (var ii = 0; ii < 50; ++ii) {
  // Setup a random rectangle
  // This will write to positionBuffer because
  // its the last thing we bound on the ARRAY_BUFFER
  // bind point
  setRectangle(
      gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

  // Set a random color.
  gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

  // Draw the rectangle.
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}



// Returns a random integer from 0 to range - 1.
function randomInt(range) {
  return Math.floor(Math.random() * range);
}

// Fills the buffer with the values that define a rectangle.

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;

  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2]), gl.STATIC_DRAW);
}
