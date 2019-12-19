<template>
  <div class="music">
    <div class="changeBtn" @click="changeSize"></div>
    <MusicPlayer :type="type" />
    <MusicVisiual :type="type" />
  </div>
</template>

<script>
import MusicPlayer from "./music-player/player";
import MusicVisiual from "./music-visiual/visiual";

export default {
  components: { MusicPlayer, MusicVisiual },
  data() {
    return {
      type: "min"
    };
  },
  methods: {
    changeSize() {
      if (this.type == "normal") {
        this.type = "min";
      } else {
        this.type = "normal";
      }
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
.music {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  // align-items: center;
  justify-content: center;

  .changeBtn {
    position: absolute;
    top: 0;
    right: 0px;
    width: 0px;
    height: 0px;

    &:before {
      position: absolute;
      width: 50px;
      height: 50px;
      top: 23px;
      right: 13px;
      font-family: FontAwesome;
      content: "\f0c9";
      color: red;
      font-size: 16px;
      line-height: 16px;
      cursor: pointer;
      z-index: 10;
      transition: all 0.3s ease-in;
    }
    .btnColor {
      color: #959595 !important;
    }
  }
}
</style>
