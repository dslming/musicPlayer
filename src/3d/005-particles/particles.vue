<template>
  <div class="particles">
    <div id="canvasFather"></div>
    <div class="name">
      粒粒可见
    </div>
  </div>
</template>

<script>
import logic from "../dist/005-particles/logic/Logic";

let that = null;

export default {
  props: ["type"],
  computed: {
    playing() {
      return logic.audio.subject.playing;
    }
  },
  mounted() {
    logic.initStage();
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
        } else {
          logic.stage.stop();
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
  }
};
</script>

<style lang="scss">
.name {
  font-family: "china";
  position: absolute;
  bottom: 40px;
  left: 30px;
  font-size: 40px;
  color: #ddd;
}
.particles {
  width: 100%;
  height: 100%;
  #canvasFather {
    width: 100%;
    height: 100%;

    background-color: #000;
    background-image: radial-gradient(
      ellipse farthest-corner at center top,
      #003466 0%,
      #000000 80%
    );
  }
}
</style>
