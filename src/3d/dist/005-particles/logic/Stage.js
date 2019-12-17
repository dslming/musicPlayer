// import { dao } from './model'
// import { EventContent } from './Moumade'
// import StageUvProcess from './StageUvProcess'
const THREE = window.THREE;
let that = null;
export default class Stage {
    constructor(container) {
        this.container = container;
        this.runFlag = false;
        this.initFlag = false;
        // 场景里所有的mesh对象
        this.meshObjects = [];
        that = this;
        // 场景
        this.scene = new THREE.Scene();
        window.scene = this.scene;
        this.scene.name = "moumade";
        this.scene.fog = new THREE.Fog(0x000000, 1, 300000);
        // 渲染器
        this.containerEle = document.querySelector(container);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            precision: 'highp'
        });
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.containerEle.clientWidth, this.containerEle.clientHeight);
        this.containerEle.appendChild(this.renderer.domElement);
        this.initCamera();
        this.initLight();
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
        // this.initControl()
        this.initStats();
    }
    handleResize() {
        // 获取新的大小
        let vpW = that.containerEle.clientWidth;
        let vpH = that.containerEle.clientHeight;
        // 设置场景
        that.renderer.domElement.width = vpW;
        that.renderer.domElement.height = vpH;
        that.renderer.setSize(that.containerEle.clientWidth, that.containerEle.clientHeight);
        // 设置相机
        that.camera.aspect = vpW / vpH;
        that.camera.updateProjectionMatrix();
    }
    initLight() {
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 10000, this.camera.position.z + 4000);
        spotLight.name = "spotLight";
        this.scene.add(spotLight);
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 400000);
        this.camera.position.z = 550000;
        this.camera.position.y = 10000;
        this.camera.lookAt(new THREE.Vector3(0, 6000, 0));
        this.scene.add(this.camera);
        this.camera.name = "camera";
    }
    initControl() {
        this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.control.autoRotate = false;
        this.control.enabled = true;
    }
    findMesh(objcet) {
        if (objcet.children) {
            objcet.children.forEach((data) => {
                if (data instanceof THREE.Mesh) {
                    if (this.meshObjects.length == 0 || this.meshObjects[this.meshObjects.length - 1].uuid != data.uuid) {
                        this.meshObjects.push(data);
                    }
                }
                this.findMesh(data);
            });
        }
    }
    initStats() {
        const Stats = window.Stats;
        this.stats = new Stats(); // 创建一个性能监视器
        this.stats.domElement.style.position = 'absolute'; // 样式， 坐标
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        document.querySelector(this.container).appendChild(this.stats.domElement);
    }
    run() {
        that.animateId = requestAnimationFrame(that.run);
        that.renderer.render(that.scene, that.camera);
        // that.control.update()
        that.stats.update();
        that.loopCB && that.loopCB();
    }
    stop() {
        cancelAnimationFrame(this.animateId);
    }
    rigister(loopCB) {
        this.loopCB = loopCB;
    }
    resize() {
        this.handleResize();
    }
}
