'use strict'

require('./main.css')
import Julia from './julia'
import Debouncer from './Debouncer'

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

const zoom = new Debouncer((zoomIn) => {
  const multiplier = zoomIn ? 0.9 : 1.1
  renderOptions.xLength *= multiplier
  julia.render(renderOptions)
})

const pan = new Debouncer((e) => {
  const pixelToDistanceRatio = renderOptions.xLength / width
  renderOptions.complexCenter[0] -= e.movementX * pixelToDistanceRatio
  renderOptions.complexCenter[1] += e.movementY * pixelToDistanceRatio
  window.requestAnimationFrame(julia.render.bind(julia, renderOptions))
})
const panEventHandler = (e) => pan.exec(e)

canvas.addEventListener('mousedown', () => canvas.addEventListener('mousemove', panEventHandler))
canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', panEventHandler))

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'a') {
    zoom.exec(true)
  } else if (keyName === 'z') {
    zoom.exec(false)
  }
})










// const rerenderJulia = (e) => {
//   const pixelToDistanceRatio = renderOptions.xLength / width
//   renderOptions.complexCenter[0] -= e.movementX * pixelToDistanceRatio
//   renderOptions.complexCenter[1] += e.movementY * pixelToDistanceRatio
//   window.requestAnimationFrame(julia.render.bind(julia, renderOptions))
// }
//
// canvas.addEventListener('mousedown', () => canvas.addEventListener('mousemove', rerenderJulia))
// canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', rerenderJulia))
// canvas.addEventListener('dblclick', (e) => {
//   const pixelToDistanceRatio = renderOptions.xLength / width
//   // renderOptions.complexCenter[0] -= e.offsetX * pixelToDistanceRatio
//   // renderOptions.complexCenter[1] += e.movementY * pixelToDistanceRatio
//   renderOptions.xLength /= 2
//   window.requestAnimationFrame(julia.render.bind(julia, renderOptions))
// })

// window.onmousewheel = (e) => {
//   const multiplier = event.wheelDelta > 0 ? 1.01 : 0.99
//   renderOptions.xLength /= multiplier
//   window.requestAnimationFrame(julia.render.bind(julia, renderOptions))
// }
