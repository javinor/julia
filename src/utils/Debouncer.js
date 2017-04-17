'use strict'

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame

export default class Debouncer {
  constructor(callback) {
    this.callback = callback
    this.busy = false
  }

  exec(...args) {
    if (!this.busy) {
      requestAnimationFrame(() => {
        this.callback(...args)
        this.busy = false
      })
      this.busy = true
    }
  }
}
