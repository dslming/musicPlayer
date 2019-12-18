const THREE = (window as any).THREE

export const sideSticksFragment = `
#define USE_FOG;
${THREE.ShaderChunk["fog_pars_fragment"]}
varying vec3 vColor;
  void main(){
    vec3 color = vec3(vColor);
    gl_FragColor = vec4(color,1.);
    ${THREE.ShaderChunk["fog_fragment"]}
  }
`;
