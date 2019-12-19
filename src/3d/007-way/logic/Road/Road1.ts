import { roadMarkings_fragment } from './roadMarkings_fragment'
import { roadBaseFragment } from './roadBaseFragment'
import { roadMarkings_vars } from './roadMarkings_vars'
import { roadVertex } from './roadVertex'

const THREE = (window as any).THREE

const islandFragment = roadBaseFragment
  .replace("#include <roadMarkings_fragment>", "")
  .replace("#include <roadMarkings_vars>", "");


const roadFragment = roadBaseFragment
  .replace("#include <roadMarkings_fragment>", roadMarkings_fragment)
  .replace("#include <roadMarkings_vars>", roadMarkings_vars);

export class Road {
  webgl: any;
  options: any;
  uTime: any;
  leftRoadWay: any;
  rightRoadWay: any;
  island: any;
  constructor(webgl: any, options: any) {
    this.webgl = webgl;
    this.options = options;

    this.uTime = new THREE.Uniform(0);
  }
  createIsland() {
    const options = this.options;
    let segments = 100;
  }

  // Side  = 0 center, = 1 right = -1 left
  createPlane(side: number, width: any, isRoad: boolean) {
    const options = this.options;
    let segments = 100;
    const geometry = new THREE.PlaneBufferGeometry(
      isRoad ? options.roadWidth : options.islandWidth,
      options.length,
      20,
      segments
    );
    let uniforms = {
      uTravelLength: new THREE.Uniform(options.length),
      uColor: new THREE.Uniform(
        new THREE.Color(
          isRoad ? options.colors.roadColor : options.colors.islandColor
        )
      ),
      uTime: this.uTime
    };
    if (isRoad) {
      uniforms = Object.assign(uniforms, {
        uLanes: new THREE.Uniform(options.lanesPerRoad),
        uBrokenLinesColor: new THREE.Uniform(
          new THREE.Color(options.colors.brokenLines)
        ),
        uShoulderLinesColor: new THREE.Uniform(
          new THREE.Color(options.colors.shoulderLines)
        ),
        uShoulderLinesWidthPercentage: new THREE.Uniform(
          options.shoulderLinesWidthPercentage
        ),
        uBrokenLinesLengthPercentage: new THREE.Uniform(
          options.brokenLinesLengthPercentage
        ),
        uBrokenLinesWidthPercentage: new THREE.Uniform(
          options.brokenLinesWidthPercentage
        )
      });
    }
    const material = new THREE.ShaderMaterial({
      fragmentShader: isRoad ? roadFragment : islandFragment,
      vertexShader: roadVertex,
      side: THREE.DoubleSide,
      uniforms: Object.assign(
        uniforms,
        this.webgl.fogUniforms,
        options.distortion.uniforms
      )
    });

    material.onBeforeCompile = (shader: any) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        options.distortion.getDistortion
      );
    };
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    // Push it half further away
    mesh.position.z = -options.length / 2;
    mesh.position.x +=
      (this.options.islandWidth / 2 + options.roadWidth / 2) * side;
    this.webgl.scene.add(mesh);
    mesh.name = "road"
    return mesh;
  }

  init() {
    this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);
    this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);
    this.island = this.createPlane(0, this.options.islandWidth, false);
  }

  update(time: any) {
    this.uTime.value = time;
  }
}
