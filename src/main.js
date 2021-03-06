'use strict'

import './main.css'
import Julia from './julia'
import Debouncer from './utils/Debouncer'
import Axes from './utils/Axes'

const canvas = document.getElementById('julia')
const juliaConstantEl = document.getElementById('constant')
const julia = new Julia({
  canvas,
  complexCenter: {x: 0, y: 0},
  constant: JSON.parse(juliaConstantEl.innerText),
  xLength: 8
})

const axes = new Axes({
  center: julia.complexCenter,
  xLength: julia.xLength,
  yLength: julia.xLength * canvas.height / canvas.width,
  distanceToPixelRatio: julia.xLength / canvas.width
})

const debouncedRender = new Debouncer(() => {
  julia.render()
  axes.render({
    center: julia.complexCenter,
    xLength: julia.xLength,
    yLength: julia.xLength * canvas.height / canvas.width,
    distanceToPixelRatio: julia.xLength / canvas.width
  })
})
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
  const step = 20
  switch (e.key) {
    case 'a': debouncedKeyboardZoom.exec(0.9); break
    case 'z': debouncedKeyboardZoom.exec(1.1); break
    case 'ArrowUp': debouncedKeyboardPan.exec(0, step); break
    case 'ArrowRight': debouncedKeyboardPan.exec(-step, 0); break
    case 'ArrowDown': debouncedKeyboardPan.exec(0, -step); break
    case 'ArrowLeft': debouncedKeyboardPan.exec(step, 0); break
  }

  axes.render({
    center: julia.complexCenter,
    xLength: julia.xLength,
    yLength: julia.xLength * canvas.height / canvas.width,
    distanceToPixelRatio: julia.xLength / canvas.width
  })
})
