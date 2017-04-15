'use strict'

const webglUtils = require('./webgl-utils')
const juliaShaders = require('./juliaShaders')
const vertexShaderSource = juliaShaders.vertexShaderSource
const fragmentShaderSource = juliaShaders.fragmentShaderSource

const canvas = document.getElementById('julia')
const gl = canvas.getContext('webgl') // TODO debug
const vertexShader = webglUtils.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = webglUtils.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
const program = webglUtils.createProgram(gl, vertexShader, fragmentShader)

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
const cUniformLocation = gl.getUniformLocation(program, 'c')
const bottomUniformLocation = gl.getUniformLocation(program, 'bottom')
const leftUniformLocation = gl.getUniformLocation(program, 'left')
const heightUniformLocation = gl.getUniformLocation(program, 'height')
const widthUniformLocation = gl.getUniformLocation(program, 'width')

const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

var positions = [-1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, -1]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

// RENDERING CODE
function drawJulia() {
  webglUtils.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)

  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2          // 2 components per iteration
  var type = gl.FLOAT   // the data is 32bit floats
  var normalize = false // don't normalize the data
  var stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0        // start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

// -0.828 - 0.180i
  gl.uniform2f(cUniformLocation, -0.828, -0.180);
  gl.uniform1f(bottomUniformLocation, -2);
  gl.uniform1f(leftUniformLocation, -2);
  gl.uniform1f(heightUniformLocation, 4);
  gl.uniform1f(widthUniformLocation, 4);

  gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2)
}

drawJulia()