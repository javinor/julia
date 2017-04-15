'use strict'

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_position;

  void main() {
    gl_Position = vec4(a_position, 0, 1);

    float x = a_position.x;
    float y = a_position.y;
    v_position = vec2(x, y);
  }
`
const fragmentShaderSource = `
  precision mediump float;

  varying vec2 v_position;

  void main() {
    vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    float norm;
    float x = v_position.x;
    float y = v_position.y;
    float tempX;
    float tempY;

    for (int i = 0; i < 4000; i++) {
      tempX = x * x - y * y;
      tempY = 2.0 * x * y;

      x = tempX - 0.71;
      y = tempY - 0.2;

      norm = x * x + y * y;

      if (norm > 4.0) break;
    }

    if (norm > 4.0) {
      gl_FragColor = black;
    } else {
      gl_FragColor = white;
    }
  }
`

module.exports = {
  vertexShaderSource,
  fragmentShaderSource
}
