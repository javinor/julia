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
var positions = [
  -1, 1,
  1, 1,
  -1, -1,
  -1, -1,
  1, 1,
  1, -1
]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)



// RENDERING CODE
function drawMandelbrot() {
  webglUtils.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program)
  // gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2          // 2 components per iteration
  var type = gl.FLOAT   // the data is 32bit floats
  var normalize = false // don't normalize the data
  var stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0        // start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

  gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
  gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2)
}

drawMandelbrot()
