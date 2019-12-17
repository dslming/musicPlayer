// import { dao } from './model'
// import { EventContent } from './Moumade'
// import StageUvProcess from './StageUvProcess'

const THREE = (window as any).THREE
let that: any = null
export default class Stage {
  public scene: any
  private loopCB!: Function
  private runFlag: boolean = false
  private stats: any
  private renderer: any
  public camera: any
  public initFlag: boolean = false
  private control: any
  private containerEle: any
  // 场景里所有的mesh对象
  private meshObjects: any = []
  private animateId: any

  constructor(private container: string) {
    that = this
    // 场景
    this.scene = new THREE.Scene();
    (window as any).scene = this.scene
    this.scene.name = "moumade";
    this.scene.fog = new THREE.Fog(0x000000, 1, 300000)
    // 渲染器
    this.containerEle = document.querySelector(container)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: 'highp'
    });
    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.containerEle.clientWidth, this.containerEle.clientHeight);
    this.containerEle.appendChild(this.renderer.domElement);

    this.initCamera()
    this.initLight()
    window.addEventListener("resize", this.handleResize)
    this.handleResize()
    // this.initControl()
    this.initStats()
  }

  private handleResize() {
    // 获取新的大小
    let vpW = that.containerEle.clientWidth
    let vpH = that.containerEle.clientHeight

    // 设置场景
    that.renderer.domElement.width = vpW
    that.renderer.domElement.height = vpH
    that.renderer.setSize(that.containerEle.clientWidth, that.containerEle.clientHeight);

    // 设置相机
    that.camera.aspect = vpW / vpH;
    that.camera.updateProjectionMatrix();
  }

  private initLight() {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 10000, this.camera.position.z + 4000);
    spotLight.name = "spotLight"
    this.scene.add(spotLight)
  }

  private initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 400000)
    this.camera.position.z = 550000;
    this.camera.position.y = 10000;
    this.camera.lookAt(new THREE.Vector3(0, 6000, 0));
    this.scene.add(this.camera)
    this.camera.name = "camera"
  }

  private initControl() {
    this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    this.control.autoRotate = false;
    this.control.enabled = true;
  }

  private findMesh(objcet: any) {
    if (objcet.children) {
      objcet.children.forEach((data: any) => {
        if (data instanceof THREE.Mesh) {
          if (this.meshObjects.length == 0 || this.meshObjects[this.meshObjects.length - 1].uuid != data.uuid) {
            this.meshObjects.push(data)
          }
        }
        this.findMesh(data)
      });
    }
  }

  private initStats() {
    const Stats = (window as any).Stats
    this.stats = new Stats();  // 创建一个性能监视器
    this.stats.domElement.style.position = 'absolute';  // 样式， 坐标
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    (document.querySelector(this.container) as any).appendChild(this.stats.domElement);
  }

  public run() {
    that.animateId = requestAnimationFrame(that.run);
    that.renderer.render(that.scene, that.camera);
    // that.control.update()
    that.stats.update()
    that.loopCB && that.loopCB()
  }

  public stop() {
    cancelAnimationFrame(this.animateId)
  }

  public rigister(loopCB: Function) {
    this.loopCB = loopCB
  }

  public resize() {
    this.handleResize()
  }
}
