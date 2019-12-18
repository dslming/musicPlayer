
const THREE = (window as any).THREE
import { random, pickRandom } from '../Tool'
import { carLightsFragment } from './carLightsFragment'
import { carLightsVertex } from './carLightsVertex'
// 车灯
export class CarLights {
  webgl: any;
  options: any;
  colors: any;
  speed: any;
  fade: any;
  mesh: any;
  constructor(webgl: any, options: any, colors: any, speed: any, fade: any) {
    this.webgl = webgl;
    this.options = options;
    this.colors = colors;
    this.speed = speed;
    this.fade = fade;
  }
  init() {
    const options = this.options;
    // Curve with length 1
    let curve = new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    );
    // Tube with radius = 1
    let geometry = new THREE.TubeBufferGeometry(curve, 40, 1, 8, false);

    let instanced = new THREE.InstancedBufferGeometry().copy(geometry);
    instanced.maxInstancedCount = options.lightPairsPerRoadWay * 2;

    let laneWidth = options.roadWidth / options.lanesPerRoad;

    let aOffset = [];
    let aMetrics = [];
    let aColor = [];

    let colors = this.colors;
    if (Array.isArray(colors)) {
      colors = colors.map(c => new THREE.Color(c));
    } else {
      colors = new THREE.Color(colors);
    }

    for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
      let radius = random(options.carLightsRadius);
      let length = random(options.carLightsLength);
      let speed = random(this.speed);

      let carLane = i % 3;
      let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;

      let carWidth = random(options.carWidthPercentage) * laneWidth;
      // Drunk Driving
      let carShiftX = random(options.carShiftX) * laneWidth;
      // Both lights share same shiftX and lane;
      laneX += carShiftX;

      let offsetY = random(options.carFloorSeparation) + radius * 1.3;

      let offsetZ = -random(options.length);

      aOffset.push(laneX - carWidth / 2);
      aOffset.push(offsetY);
      aOffset.push(offsetZ);

      aOffset.push(laneX + carWidth / 2);
      aOffset.push(offsetY);
      aOffset.push(offsetZ);

      aMetrics.push(radius);
      aMetrics.push(length);
      aMetrics.push(speed);

      aMetrics.push(radius);
      aMetrics.push(length);
      aMetrics.push(speed);

      let color = pickRandom(colors);
      aColor.push(color.r);
      aColor.push(color.g);
      aColor.push(color.b);

      aColor.push(color.r);
      aColor.push(color.g);
      aColor.push(color.b);
    }
    instanced.addAttribute(
      "aOffset",
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
    );
    instanced.addAttribute(
      "aMetrics",
      new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false)
    );
    instanced.addAttribute(
      "aColor",
      new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false)
    );
    let material = new THREE.ShaderMaterial({
      fragmentShader: carLightsFragment,
      vertexShader: carLightsVertex,
      transparent: true,
      uniforms: Object.assign(
        {
          // uColor: new THREE.Uniform(new THREE.Color(this.color)),
          uTime: new THREE.Uniform(0),
          uTravelLength: new THREE.Uniform(options.length),
          uFade: new THREE.Uniform(this.fade)
        },
        this.webgl.fogUniforms,
        options.distortion.uniforms
      )
    });
    material.onBeforeCompile = (shader: any) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        options.distortion.getDistortion
      );
      console.log(shader.vertex);
    };
    let mesh = new THREE.Mesh(instanced, material);
    mesh.frustumCulled = false;
    mesh.name = "carLights"
    this.webgl.scene.add(mesh);
    this.mesh = mesh;
  }
  update(time: any) {
    this.mesh.material.uniforms.uTime.value = time;
  }
}
