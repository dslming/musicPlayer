// import Stage from './Stage'
import audio from '../../PlayerAudio/PlayerAudio'
import { App } from './App'
import { LongRaceDistortion, mountainDistortion } from './Distortions'

let degree = 0
class Logic {
  private stage!: any
  public audio: any = audio
  constructor() {
  }

  public initStage() {
    this.init()
    this.stage.rigister(() => {
      degree += audio.getAverageFrequency() * 0.0003
      this.stage.updataDelta(degree)
    })
  }

  private init() {
    const container = document.querySelector("#canvasFather");
    const options = {
      onSpeedUp: (ev: any) => {
      },
      onSlowDown: (ev: any) => {
      },
      distortion: mountainDistortion,
      length: 400,
      roadWidth: 10,
      islandWidth: 5,
      lanesPerRoad: 2,

      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,

      totalSideLightSticks: 50,
      lightPairsPerRoadWay: 70,

      // Percentage of the lane's width
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,

      /*** These ones have to be arrays of [min,max].  ***/
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],

      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],

      /****  Anything below can be either a number or an array of [min,max] ****/

      // Length of the lights. Best to be less than total length
      carLightsLength: [400 * 0.05, 400 * 0.15],
      // Radius of the tubes
      carLightsRadius: [0.05, 0.14],
      // Width is percentage of a lane. Numbers from 0 to 1
      carWidthPercentage: [0.3, 0.5],
      // How drunk the driver is.
      // carWidthPercentage's max + carShiftX's max -> Cannot go over 1.
      // Or cars start going into other lanes
      carShiftX: [-0.2, 0.2],
      // Self Explanatory
      carFloorSeparation: [0.05, 1],

      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0x131318,
        brokenLines: 0x131318,
        /***  Only these colors can be an array ***/
        leftCars: [0xFF5F73, 0xE74D60, 0xff102a],
        rightCars: [0xA4E3E6, 0x80D1D4, 0x53C2C6],
        sticks: 0xA4E3E6,
      }
    };

    this.stage = new App(container, options);
    this.stage.loadAssets().then(this.stage.init)
  }

}

export default new Logic()
