'use strict'

import './main.css'
import Julia from './julia'
import Debouncer from './utils/Debouncer'

const canvas = document.getElementById('julia')
const juliaConstantEl = document.getElementById('constant')
const julia = new Julia({
  canvas,
  complexCenter: {x: 0, y: 0},
  constant: JSON.parse(juliaConstantEl.innerText),
  xLength: 4
})

const debouncedRender = new Debouncer(() => julia.render())
window.onresize = () => debouncedRender.exec()

const debouncedChangeConstant = new Debouncer((pixelPoint) => {
  julia.changeConstant(pixelPoint)
  juliaConstantEl.innerText = JSON.stringify(julia.constant, (key, value) => isNaN(value) ? value : value.toFixed(3))
})

const mouseMoveListener = (e) => debouncedChangeConstant.exec({x: e.clientX, y: e.clientY})
canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', mouseMoveListener))
canvas.addEventListener('mousedown', (e) => {
  debouncedChangeConstant.exec({x: e.clientX, y: e.clientY})
  canvas.addEventListener('mousemove', mouseMoveListener)
})

const debouncedKeyboardZoom = new Debouncer((multiplier) => julia.zoom(multiplier))
const debouncedKeyboardPan = new Debouncer((dx, dy) => julia.pan(dx, dy))
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
