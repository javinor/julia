precision highp float;

uniform vec2 constant;
varying vec2 complexPoint;

void main() {
  vec4 black = vec4(0, 0, 0, 1);

  float iter = 0.0;
  float x = complexPoint.x;
  float y = complexPoint.y;
  float tempX;
  float tempY;

  for (int i = 0; i < 1000; i++) {
    iter += 1.0;
    tempX = x * x - y * y;
    tempY = 2.0 * x * y;

    x = tempX + constant.x;
    y = tempY + constant.y;

    if (length(vec2(x,y)) > 256.0) break;
  }

  if (length(vec2(x,y)) > 256.0) {
    // http://www.iquilezles.org/www/articles/palettes/palettes.htm
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.6, 0.4, 0.2);

    iter -= log2(log2(length(vec2(x,y))));

    gl_FragColor = vec4(a + b * cos(6.28318 * (c * iter + d)), 1);
  } else {
    gl_FragColor = black;
  }
}
