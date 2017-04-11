'use strict'

const vertexShaderSource = `
  attribute vec2 a_position;
  uniform vec4 u_borders; // [top, right, bottom, left]
  varying vec2 v_position;

  void main() {
    gl_Position = vec4(a_position, 0, 1);

    float x = ((a_position.x + 1.0) / 2.0) * (u_borders[1] - u_borders[3]) + u_borders[3];
    float y = ((a_position.y + 1.0) / 2.0) * (u_borders[0] - u_borders[2]) + u_borders[2];

    v_position = vec2(x, y);
  }
`
const fragmentShaderSource = `
  precision mediump float;

  uniform vec2 c;
  varying vec2 v_position;

  void main() {
    int count = 0;
    vec2 z = v_position;

    for (int i = 0; i < 100; i++) {
      float x = (z.x * z.x - z.y * z.y) + c.x;
      float y = (z.y * z.x + z.x * z.y) + c.y;
      z.x = x;
      z.y = y;

      if (length(z) > 2.0) break;

      count++;
    }

    if (count >= 10) {
      gl_FragColor = vec4(1, 1, 1, 1);
    } else {
      gl_FragColor = vec4(0, 0, 0, 1);
    }
  }

  // float norm(v) {
  //
  // }
`

module.exports = {
  vertexShaderSource,
  fragmentShaderSource
}
