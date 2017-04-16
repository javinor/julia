'use strict'

require('./main.css')

import Julia from './julia'

const canvas = document.getElementById('julia')
const julia = new Julia({canvas})

const width = canvas.width
const renderOptions = {
  complexCenter: [0, 0],
  constant: [-0.828, -0.180],
  xLength: 4
}
julia.render(renderOptions)

const mouseDownCoords = {}
const rerenderJulia = (e) => {
  const pixelToDistanceRatio = renderOptions.xLength / width
  renderOptions.complexCenter[0] -= e.movementX * pixelToDistanceRatio
  renderOptions.complexCenter[1] += e.movementY * pixelToDistanceRatio
  window.requestAnimationFrame(julia.render.bind(julia, renderOptions))
}

canvas.addEventListener('mousedown', () => canvas.addEventListener('mousemove', rerenderJulia))
canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', rerenderJulia))
canvas.addEventListener('dblclick', (e) => {
  const pixelToDistanceRatio = renderOptions.xLength / width
  // renderOptions.complexCenter[0] -= e.offsetX * pixelToDistanceRatio
  // renderOptions.complexCenter[1] += e.movementY * pixelToDistanceRatio
  renderOptions.xLength /= 2
  window.requestAnimationFrame(julia.render.bind(julia, renderOptions))
})
