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
        this.scene.name = "moumade";
        window.scene = this.scene;
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
        this.initLight();
        this.initCamera();
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
        let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
        hemisphereLight.name = 'hemisphereLight';
        hemisphereLight.position.set(0, 0, 0);
        let shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
        shadowLight.name = 'shadowLight';
        shadowLight.position.set(100, 100, 100);
        shadowLight.castShadow = true;
        shadowLight.shadow.camera.left = -400; // 产生阴影距离位置的最左边位置
        shadowLight.shadow.camera.right = 400;
        shadowLight.shadow.camera.top = 400;
        shadowLight.shadow.camera.bottom = -400;
        shadowLight.shadow.camera.near = 1; // 产生阴影的最近距离
        shadowLight.shadow.camera.far = 1000; // 产生阴影的最远距离
        shadowLight.shadow.mapSize.width = 2048;
        shadowLight.shadow.mapSize.height = 2048;
        let backLight = new THREE.DirectionalLight(0xffffff, 0.8);
        backLight.position.set(-100, 100, 100);
        backLight.castShadow = true;
        backLight.shadowDarkness = 0.1;
        backLight.shadowMapWidth = 1024;
        backLight.name = 'backLight';
        this.scene.add(hemisphereLight);
        this.scene.add(shadowLight);
        this.scene.add(backLight);
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.containerEle.clientWidth / this.containerEle.clientHeight, 10, 2000);
        this.camera.name = "camera";
        this.scene.add(this.camera);
        this.camera.position.set(0, 0, 300);
    }
    initControl() {
        this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.control.autoRotate = true;
        this.control.enabled = true;
    }
    addMeshObject() {
        if (this.initFlag) {
            return this.initFlag;
        }
        this.initFlag = true;
        // let { bottleMesh } = dao.getData()
        // this.uvRender.markArea((texture: any) => {
        //   bottleMesh.traverse((child: any) => {
        //     if (child.isMesh) {
        //       child.material.map = texture;
        //       child.material.map.needsUpdate = true;
        //     }
        //   });
        // })
        // this.scene.add(bottleMesh)
        return this.initFlag;
    }
    removeMeshObject() {
        let group = this.scene.children[3];
        group.traverse(function (obj) {
            if (obj.type === 'Mesh') {
                obj.geometry.dispose();
                obj.material.dispose();
            }
        });
        this.scene.remove(group);
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
        console.error(1234);
    }
}
