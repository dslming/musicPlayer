<template>
  <div class="wave">
    <div id="canvasFather"></div>
    <div class="name">
      浪里个浪
    </div>
  </div>
</template>

<script>
import logic from "../dist/006-wave/logic/Logic";

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
  position: absolute;
  bottom: 40px;
  left: 30px;
  font-size: 20px;
  color: rgb(53, 154, 194);
}
.wave {
  width: 100%;
  height: 100%;
  #canvasFather {
    width: 100%;
    height: 100%;
    background-color: rgb(204, 204, 204);
  }
}
</style>
