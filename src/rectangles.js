'use strict'

const webglUtils = require('./webgl-utils')

const canvas = document.getElementById("c")
const gl = canvas.getContext("webgl") // TODO debug

const vertexShaderSource = `
  // an attribute will receive data from a buffer
  attribute vec2 a_position;
  uniform vec2 u_resolution;
  // all shaders have a main function
  void main() {
    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;

    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  }
`
const fragmentShaderSource = `
  precision mediump float;
  uniform vec4 u_color;
  void main() {
    gl_FragColor = u_color;
  }

`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) return shader

  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) return program

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}


const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
const program = createProgram(gl, vertexShader, fragmentShader)

const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
const colorUniformLocation = gl.getUniformLocation(program, "u_color");

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
