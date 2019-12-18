// console.log(POSTPROCESSING);
// const THREE = (window as any).THREE
const POSTPROCESSING = window.POSTPROCESSING;
const THREE = window.THREE;
import { distortion_vertex } from './distortion_vertex';
import { Road } from './Road/Road';
import { CarLights } from './CarLights/CarLights';
import { LightsSticks } from './LightsSticks/LightsSticks';
let that;
const distortion_uniforms = {
    uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
    uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5))
};
export class App {
    constructor(container, options = {}) {
        this.options = {};
        this.assets = {};
        this.disposed = false;
        this.delta = 0;
        that = this;
        this.options = options;
        this.container = container;
        if (this.options.distortion == null) {
            this.options.distortion = {
                uniforms: distortion_uniforms,
                getDistortion: distortion_vertex
            };
        }
        this.initStage(options);
        this.initStats();
        // Binds
        this.tick = this.tick.bind(this);
        this.init = this.init.bind(this);
    }
    initStats() {
        const Stats = window.Stats;
        this.stats = new Stats(); // 创建一个性能监视器
        this.stats.domElement.style.position = 'absolute'; // 样式， 坐标
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        this.container.appendChild(this.stats.domElement);
    }
    initStage(options) {
        // 初始化渲染器
        let container = this.container;
        this.renderer = new THREE.WebGLRenderer({
            antialias: false
        });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.composer = new POSTPROCESSING.EffectComposer(this.renderer);
        container.append(this.renderer.domElement);
        // 初始化相机
        this.camera = new THREE.PerspectiveCamera(options.fov, container.offsetWidth / container.offsetHeight, 0.1, 10000);
        this.camera.position.z = -5;
        this.camera.position.y = 8;
        this.camera.position.x = 0;
        // 场景
        this.scene = new THREE.Scene();
        window.scene = this.scene;
        let fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
        this.scene.fog = fog;
        this.fogUniforms = {
            fogColor: { type: "c", value: fog.color },
            fogNear: { type: "f", value: fog.near },
            fogFar: { type: "f", value: fog.far }
        };
        this.assets = {};
        // 增加3d物体
        this.road = new Road(this, options);
        this.leftCarLights = new CarLights(this, options, options.colors.leftCars, options.movingAwaySpeed, new THREE.Vector2(0, 1 - options.carLightsFade));
        this.rightCarLights = new CarLights(this, options, options.colors.rightCars, options.movingCloserSpeed, new THREE.Vector2(1, 0 + options.carLightsFade));
        this.leftSticks = new LightsSticks(this, options);
    }
    initPasses() {
        this.renderPass = new POSTPROCESSING.RenderPass(this.scene, this.camera);
        this.bloomPass = new POSTPROCESSING.EffectPass(this.camera, new POSTPROCESSING.BloomEffect({
            luminanceThreshold: 0.2,
            luminanceSmoothing: 0,
            resolutionScale: 1
        }));
        console.log(this.assets.smaa, this.camera);
        const smaaPass = new POSTPROCESSING.EffectPass(this.camera, new POSTPROCESSING.SMAAEffect(this.assets.smaa.search, this.assets.smaa.area, POSTPROCESSING.SMAAPreset.MEDIUM));
        this.renderPass.renderToScreen = false;
        this.bloomPass.renderToScreen = false;
        smaaPass.renderToScreen = true;
        this.composer.addPass(this.renderPass);
        this.composer.addPass(this.bloomPass);
        this.composer.addPass(smaaPass);
    }
    update(delta) {
        let time = delta;
        this.rightCarLights.update(time);
        this.leftCarLights.update(time);
        this.leftSticks.update(time);
        this.road.update(time);
        let updateCamera = false;
        if (this.options.distortion.getJS) {
            const distortion = this.options.distortion.getJS(0.025, time);
            this.camera.lookAt(new THREE.Vector3(this.camera.position.x + distortion.x, this.camera.position.y + distortion.y, this.camera.position.z + distortion.z));
            updateCamera = true;
        }
        if (updateCamera) {
            this.camera.updateProjectionMatrix();
        }
        this.stats.update();
    }
    tick() {
        if (this.disposed) {
            this.composer.render();
            this.update(this.delta);
            this.loopCB && this.loopCB();
        }
        ;
        requestAnimationFrame(this.tick);
    }
    loadAssets() {
        const assets = this.assets;
        return new Promise((resolve, reject) => {
            assets.smaa = {};
            const manager = new THREE.LoadingManager(resolve);
            const searchImage = new Image();
            const areaImage = new Image();
            searchImage.addEventListener("load", function () {
                assets.smaa.search = this;
                manager.itemEnd("smaa-search");
            });
            areaImage.addEventListener("load", function () {
                assets.smaa.area = this;
                manager.itemEnd("smaa-area");
            });
            manager.itemStart("smaa-search");
            manager.itemStart("smaa-area");
            searchImage.src = POSTPROCESSING.SMAAEffect.searchImageDataURL;
            areaImage.src = POSTPROCESSING.SMAAEffect.areaImageDataURL;
        });
    }
    init() {
        this.initPasses();
        const options = this.options;
        this.road.init();
        this.leftCarLights.init();
        this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);
        this.rightCarLights.init();
        this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);
        this.leftSticks.init();
        this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));
        this.tick();
    }
    resize() {
        // 获取新的大小
        let vpW = that.container.clientWidth;
        let vpH = that.container.clientHeight;
        // 设置场景
        that.renderer.domElement.width = vpW;
        that.renderer.domElement.height = vpH;
        that.renderer.setSize(vpW, vpH);
        this.composer.setSize(vpW, vpH, false);
        // 设置相机
        that.camera.aspect = vpW / vpH;
        that.camera.updateProjectionMatrix();
    }
    rigister(loopCB) {
        this.loopCB = loopCB;
    }
    run() {
        this.disposed = true;
    }
    stop() {
        this.disposed = false;
    }
    updataDelta(v) {
        this.delta = v;
    }
}
