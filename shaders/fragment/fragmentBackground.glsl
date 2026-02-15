uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  float dist = distance(vUv, center);
  float pulse = sin(uTime * 0.5) * 0.1;

  float intensity = smoothstep(0.5, 0.0, dist + pulse);

  vec3 base = vec3(0.349, 0.078, 0.125);
  vec3 lighter = vec3(0.5, 0.15, 0.2);

  vec3 color = mix(base, lighter, intensity);

  gl_FragColor = vec4(color, 1.0);
}
