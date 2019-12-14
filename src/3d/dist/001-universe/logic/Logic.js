import Stage from './Stage';
import Robot from './Robot';
import SkyBox from './SkyBox';
import DustStream from './DustStream';
import audio from '../../PlayerAudio/PlayerAudio';
class Logic {
    constructor() {
        this.audio = audio;
    }
    addStageObjects() {
        // 增加人物
        this.robot = new Robot();
        this.robot.mesh.scale.set(0.5, 0.5, 0.5);
        this.robot.mesh.position.y = 0;
        this.robot.mesh.rotation.z = Math.PI / 20;
        this.robot.mesh.rotation.x = Math.PI / 10;
        this.robot.mesh.name = 'robot';
        this.stage.scene.add(this.robot.mesh);
        // 增加流星
        this.duststream = new DustStream();
        this.duststream.mesh.rotation.z = Math.PI / 20;
        this.duststream.mesh.rotation.x = Math.PI / 10;
        this.duststream.mesh.name = 'duststream';
        this.stage.scene.add(this.duststream.mesh);
        // 增加环境
        let skybox = new SkyBox();
        skybox.mesh.name = 'skybox';
        this.stage.scene.add(skybox.mesh);
    }
    initStage() {
        this.stage = new Stage("#canvasFather");
        this.stage.rigister(() => {
            let degree = audio.getAverageFrequency();
            this.duststream.speed(degree);
            this.robot.blinkLoop();
            this.robot.idleAnimation();
        });
        this.addStageObjects();
    }
}
export default new Logic();
