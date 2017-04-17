attribute vec2 a_position;

uniform vec2 complexCenter;
uniform vec2 axisLengths;

varying vec2 complexPoint;

void main() {
  gl_Position = vec4(a_position, 0, 1);
  complexPoint = a_position * axisLengths + complexCenter;
}
