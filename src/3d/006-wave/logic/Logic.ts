import Stage from './Stage'
import audio from '../../PlayerAudio/PlayerAudio'
import Wave from './Wave'

class Logic {
  private stage!: Stage
  public audio: any = audio
  private wave!: Wave
  constructor() {
  }

  public initStage() {
    this.wave = new Wave()
    this.stage = new Stage("#canvasFather")
    this.stage.rigister(() => {
      let degree = audio.getAverageFrequency()
      this.wave.drawWave(degree)
    })
    this.wave.addStageObjects(this.stage.scene)
  }

}

export default new Logic()
