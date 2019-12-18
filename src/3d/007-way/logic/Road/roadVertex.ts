
const THREE = (window as any).THREE

export const roadVertex = `
#define USE_FOG;
uniform float uTime;
${THREE.ShaderChunk["fog_pars_vertex"]}

uniform float uTravelLength;

varying vec2 vUv;
  #include <getDistortion_vertex>
void main() {
  vec3 transformed = position.xyz;

    vec3 distortion  = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
    transformed.x += distortion.x;
    transformed.z += distortion.y;
  transformed.y += -1.*distortion.z;

  vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;

  ${THREE.ShaderChunk["fog_vertex"]}
}`;
