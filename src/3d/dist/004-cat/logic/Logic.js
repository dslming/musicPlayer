import Stage from './Stage';
import CatAction from './CatAction';
import Tool from '../../common/Tool';
import audio from '../../PlayerAudio/PlayerAudio';
const THREE = window.THREE;
class Logic {
    constructor() {
        this.audio = audio;
        this.loaded = false;
    }
    addStageObjects() {
        let loader = new THREE.ObjectLoader();
        loader.load("./static/models/cat.json", (json) => {
            this.stage.scene.add(json);
            json.rotation.set(0, 91, 0);
            this.loaded = true;
            setInterval(() => {
                CatAction.blink(json);
            }, 2000);
            setInterval(() => {
                CatAction.updataHead(json);
            }, 3000);
        }, undefined, (e) => {
            console.error(e);
        });
    }
    initStage() {
        this.stage = new Stage("#canvasFather");
        this.stage.rigister(() => {
            if (!this.loaded) {
                return;
            }
            let catMesh = Tool.findMesh(this.stage.scene, "cat");
            let degree = audio.getAverageFrequency();
            CatAction.updateTail(catMesh, degree / 2000);
        });
        this.addStageObjects();
    }
}
export default new Logic();
