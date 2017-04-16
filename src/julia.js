'use strict'

const webglUtils = require('./webgl-utils')
const juliaShaders = require('./juliaShaders')
const vertexShaderSource = juliaShaders.vertexShaderSource
const fragmentShaderSource = juliaShaders.fragmentShaderSource

const generateProgram = (gl) => {
  const vertexShader = webglUtils.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = webglUtils.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  return webglUtils.createProgram(gl, vertexShader, fragmentShader)
}

export default class {
  constructor({canvas}) {
    const gl = this.gl = canvas.getContext('webgl')
    const program = this.program = generateProgram(gl)

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

    gl.useProgram(program)
  }

  render() {
    const gl = this.gl
    const program = this.program

    const constantUniformLocation = gl.getUniformLocation(program, 'constant')
    const centerUniformLocation = gl.getUniformLocation(program, 'center')
    const axisLengthsUniformLocation = gl.getUniformLocation(program, 'axisLengths')

    webglUtils.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.uniform2f(constantUniformLocation, -0.828, -0.180)
    gl.uniform2f(centerUniformLocation, 0, 0)
    gl.uniform2f(axisLengthsUniformLocation, 4, 4 * gl.canvas.height / gl.canvas.width)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
}
