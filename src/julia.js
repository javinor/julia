'use strict'

import webglUtils from './utils/webgl-utils'
import vertexShaderSource from './shaders/julia.vertex.glsl'
import fragmentShaderSource from './shaders/julia.fragment.glsl'

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

export default class {
  constructor ({
    canvas,
    constant = {x: -0.828, y: -0.180},
    complexCenter = {x: 0, y: 0},
    xLength = 4
  } = {}) {
    const gl = this.gl = canvas.getContext('webgl')
    const program = this.program = webglUtils.createProgram(gl, vertexShaderSource, fragmentShaderSource)
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

    webglUtils.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const yLength = this.xLength * gl.canvas.height / gl.canvas.width
    gl.uniform2f(axisLengthsUniformLocation, this.xLength, yLength)
    gl.uniform2f(constantUniformLocation, this.constant.x, this.constant.y)
    gl.uniform2f(centerUniformLocation, this.complexCenter.x, this.complexCenter.y)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
}
