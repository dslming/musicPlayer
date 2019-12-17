<template>
  <div class="visiual" v-show="isShow">
    <tool @changeValue="handleChange" />
    <component v-bind:is="currentComponent" :type="type"></component>
  </div>
</template>

<script>
import Tool from "./tool/tool";
import LMAudio from "@/3d/dist/PlayerAudio/PlayerAudio";

export default {
  props: ["type"],
  components: {
    Tool,
    universe: resolve => {
      require(["@/3d/001-universe/universe"], resolve);
    },
    wind: resolve => {
      require(["@/3d/002-wind/wind"], resolve);
    },
    light: resolve => {
      require(["@/3d/003-light/light"], resolve);
    },
    cat: resolve => {
      require(["@/3d/004-cat/Cat"], resolve);
    },
    particles: resolve => {
      require(["@/3d/005-particles/particles"], resolve);
    },
    wave: resolve => {
      require(["@/3d/006-wave/wave"], resolve);
    },
    shader: resolve => {
      require(["@/3d/007-shader/shader"], resolve);
    },
    smiley: resolve => {
      require(["@/3d/008-smiley/smiley"], resolve);
    }
  },
  watch: {
    type: {
      handler: function(v) {
        if (v == "min") {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }
    }
  },
  data() {
    return {
      isShow: false,
      list: [
        {
          index: 0,
          name: "wind"
        },
        {
          index: 1,
          name: "universe"
        }
      ],
      currentIndex: 0,
      currentComponent: "wind"
    };
  },
  methods: {
    handleChange(type) {
      if (type == "next") {
        if (this.currentIndex < this.list.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
      }
      if (type == "pre") {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = this.list.length - 1;
        }
      }
      this.currentComponent = this.list[this.currentIndex].name;
      setTimeout(() => {
        LMAudio.play();
      }, 1000);
    }
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.visiual {
  width: 100%;
  height: calc(100% - 230px);
  position: absolute;
  bottom: 0;
}
</style>
