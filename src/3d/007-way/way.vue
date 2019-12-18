<template>
  <div class="way">
    <div id="canvasFather"></div>
    <div class="name">
      疯狂街道
    </div>
  </div>
</template>

<script>
import logic from "../dist/007-way/logic/Logic";

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
        if (v == "min" && logic.stage) {
          logic.stage.resize();
          if (logic.audio.subject.playing) {
            logic.stage.run();
          } else {
            logic.stage.stop();
          }
        } else if (logic.stage) {
          logic.stage.stop();
        }
      }
    },
    playing: {
      handler: function(v) {
        if (v && logic.stage) {
          logic.stage.resize();
          logic.stage.run();
        } else if (logic.stage) {
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
  top: 10px;
  left: 10px;
  font-size: 20px;
  color: rgb(218, 101, 55);
}
.way {
  width: 100%;
  height: 100%;
  overflow: hidden;
  #canvasFather {
    width: 100%;
    height: 100%;
    background-color: rgb(204, 204, 204);
  }
}
</style>
