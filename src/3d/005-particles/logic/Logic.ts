import Stage from './Stage'
import audio from '../../PlayerAudio/PlayerAudio'

const THREE = (window as any).THREE
const TweenMax = (window as any).TweenMax

let plane: any
let material: any

class Logic {
  private stage!: Stage
  public audio: any = audio
  constructor() {
  }

  private addStageObjects() {
    // 增加平面
    var planeDefinition = 100;
    var planeSize = 1245000;
    var totalObjects = 100000;
    plane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition), new THREE.MeshBasicMaterial({ color: 0x555555, wireframe: true }));
    plane.name = "plane"
    plane.rotation.x = -Math.PI * .5;
    // this.scene.add( plane );

    //增加粒子
    var totalObjects = 100000;
    var geometry = new THREE.Geometry();
    for (let i = 0; i < totalObjects; i++) {
      var vertex = new THREE.Vector3();
      vertex.x = Math.random() * planeSize - (planeSize * .5);
      vertex.y = Math.random() * 50000 - 5000 * 0.5;
      vertex.z = Math.random() * planeSize - (planeSize * .5);
      geometry.vertices.push(vertex);
    }
    var scrite = new THREE.TextureLoader().load('static/textures/disc.png')
    material = new THREE.PointsMaterial({ size: 2000, map: scrite, transparent: true });
    material.color.setHSL(1.0, 0.3, 0.7);
    var particles = new THREE.Points(geometry, material)
    particles.geometry.verticesNeedUpdate = true
    particles.name = 'particles'
    this.stage.scene.add(particles);
  }

  public initStage() {
    this.stage = new Stage("#canvasFather")
    this.stage.rigister(() => {
      let degree = audio.getAverageFrequency()
      this.loop(degree * 2)
    })
    this.addStageObjects()
  }

  private loop(speed: any) {
    var time = Date.now() * 0.00005;
    var vertexHeight = 20000;
    // let plane = this.object.plane
    for (var i = 0; i < plane.geometry.vertices.length; i++) {
      plane.geometry.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
    }
    this.stage.camera.position.z -= speed; // 150
    if (this.stage.camera.position.z < 100000) {
      TweenMax.to(this.stage.camera.position, 0, { z: 550000 })
    }
    var h = (360 * (1.0 + time) % 360) / 360;
    material.color.setHSL(h, 0.5, 0.5);
    this.stage.camera.lookAt(this.stage.scene.position)
  }

}

export default new Logic()
