<template>
  <div class="box">
    <div id="canvasFather"></div>
  </div>
</template>

<script>
import logic from "../dist/001-universe/logic/Logic";
window.lm = logic;
let that = null;
export default {
  props: ["type"],
  computed: {
    playing() {
      return logic.audio.subject.playing;
    }
  },
  watch: {
    type: {
      handler: function(v) {
        if (v == "min") {
          logic.stage.resize();
          if (logic.audio.subject.playing) {
            logic.stage.run();
          } else {
            logic.stage.stop();
          }
          // that = this;
          // let options = {
          //   renderOption: {
          //     canvasFatherId: "canvasFather"
          //   }
          // };
          // common.init(options);
          // common.resize();
          // musicVisual.startAnimationFrame();
          // console.error(123);
        } else {
          logic.stage.stop();
          // musicVisual.stopAnimationFrame();
          // this.isShow = false;
        }
      }
    },
    playing: {
      handler: function(v) {
        if (v) {
          logic.stage.run();
        } else {
          logic.stage.stop();
        }
      },
      deep: true
    }
  },
  mounted() {
    logic.initStage();
    // musicVisual.registAnimationFrame(this.loop);
    // musicVisual.startAnimationFrame();
  },
  destroyed() {
    // common.uninstall();
  },
  methods: {
    // loop() {
    //   common.rendering();
    //   let degree = musicVisual.lmaudio.getAverageFrequency();
    //   common.object.duststream.speed(parseInt(degree));
    //   common.object.robot.blinkLoop();
    //   common.object.robot.idleAnimation();
    // }
  },
  data() {
    return {
      logic: logic
    };
  }
};
</script>

<style lang="scss">
.box {
  width: 100%;
  height: 100%;

  #canvasFather {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000000;
  }
}
</style>
