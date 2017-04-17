'use strict'

import './main.css'
import Julia from './julia'
import Debouncer from './utils/Debouncer'

const canvas = document.getElementById('julia')
const julia = new Julia({
  canvas,
  complexCenter: {x: 0, y: 0},
  constant: {x: -0.828, y: -0.180},
  xLength: 4
})

const debouncedRender = new Debouncer(() => julia.render())
window.onresize = () => debouncedRender.exec()

let prevMouseCoords;
const debouncedPan = new Debouncer((e) => {
  const pixelDeltaX = e.clientX - prevMouseCoords.x
  const pixelDeltaY = e.clientY - prevMouseCoords.y
  julia.pan(pixelDeltaX, pixelDeltaY)
  prevMouseCoords.x = e.clientX
  prevMouseCoords.y = e.clientY
})
const mouseMoveListener = (e) => debouncedPan.exec(e)

canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', mouseMoveListener))
canvas.addEventListener('mousedown', (e) => {
  prevMouseCoords = { x: e.clientX, y: e.clientY }
  canvas.addEventListener('mousemove', mouseMoveListener)
})

const debouncedZoom = new Debouncer((multiplier) => julia.zoom(multiplier))
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a': debouncedZoom.exec(0.9); break;
    case 'z': debouncedZoom.exec(1.1); break;
  }
})
