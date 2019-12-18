<template>
  <div class="cat">
    <div id="canvasFather"></div>
    <div class="name">
      摇头小猫
    </div>
  </div>
</template>

<script>
import logic from "../dist/004-cat/logic/Logic";

export default {
  props: ["type"],
  computed: {
    playing() {
      return logic.audio.subject.playing;
    }
  },
  data() {
    return {};
  },
  mounted() {
    logic.initStage();
  },
  methods: {},
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
  color: #ddd;
}
.cat {
  width: 100%;
  height: 100%;
  #canvasFather {
    width: 100%;
    height: 100%;
  }
}
</style>
