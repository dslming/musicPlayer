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
        this.scene.background = new THREE.Color(0xcccccc);
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
        this.initControl();
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
        const ambientLightColor = 0xffffff;
        const spotLightColor = 0xffffff;
        const light = new THREE.AmbientLight(ambientLightColor, 1.5);
        this.scene.add(light);
        light.name = "light";
        this.scene.add(light);
        const spotLight = new THREE.SpotLight(spotLightColor, 1.8);
        spotLight.position.set(100, 69, 50);
        spotLight.castShadow = false; // 关闭灯光投掷阴影,在 iphone 6s plus 上阴影模糊,效果不好。
        spotLight.name = 'spotLight';
        spotLight.distance = 1000;
        this.scene.add(spotLight);
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(49, 100, -77);
        // this.camera.rotation.set(-2, 0, 2.5)
        this.camera.name = 'camera';
        this.scene.add(this.camera);
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
        that.control.update();
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
