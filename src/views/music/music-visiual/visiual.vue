<template>
  <div class="visiual" v-show="isShow">
    <component v-bind:is="currentComponent" :type="type"></component>
  </div>
</template>

<script>
// import musicVisual from "@/3d/MusicVisual";

export default {
  props: ["type"],
  components: {
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
      currentComponent: "universe"
    };
  },
  methods: {},
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
