const THREE = window.THREE;
export const roadBaseFragment = `
    #define USE_FOG;
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform float uTime;
    #include <roadMarkings_vars>
    ${THREE.ShaderChunk["fog_pars_fragment"]}
    void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);

        #include <roadMarkings_fragment>

        gl_FragColor = vec4(color,1.);
        ${THREE.ShaderChunk["fog_fragment"]}
    }
`;
