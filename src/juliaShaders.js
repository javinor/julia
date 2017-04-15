'use strict'

const vertexShaderSource = `
  attribute vec2 a_position;

  uniform float bottom;
  uniform float left;
  uniform float height;
  uniform float width;

  varying vec2 v_position;

  void main() {
    gl_Position = vec4(a_position, 0, 1);

    float x = ((a_position.x + 1.0) / 2.0) * width + left;
    float y = ((a_position.y + 1.0) / 2.0) * height + bottom;

    v_position = vec2(x, y);
  }
`
const fragmentShaderSource = `
  precision highp float;

  uniform vec2 c;
  varying vec2 v_position;

  void main() {
    vec4 black = vec4(0, 0, 0, 1);
    vec4 color = vec4(0, 0, 0, 1);

    float iter = 0.0;
    float x = v_position.x;
    float y = v_position.y;
    float tempX;
    float tempY;

    for (int i = 0; i < 4000; i++) {
      iter += 1.0;
      tempX = x * x - y * y;
      tempY = 2.0 * x * y;

      x = tempX + c.x;
      y = tempY + c.y;

      if (length(vec2(x,y)) > 4.0) break;
    }

    if (length(vec2(x,y)) > 4.0) {
      iter -= log2(log2(length(vec2(x,y))));
      color.r = 0.5 + 0.50 * sin(iter);
      color.g = 0.5 + 0.25 * sin(iter);
      color.b = 0.5 - 0.25 * cos(iter);
      color.a = 1.0;

      gl_FragColor = color;
    } else {
      gl_FragColor = black;
    }
  }
`

module.exports = {
  vertexShaderSource,
  fragmentShaderSource
}