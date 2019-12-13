<template>
  <div class="music">
    <div class="changeBtn" :class="myclass" @click="changeSize"></div>
    <MusicPlayer />
  </div>
</template>

<script>
import MusicPlayer from "./music-player/player";
import playerMode from "./music-player/player-mode.js";

export default {
  components: { MusicPlayer },
  myclass() {
    return this.playerMode.type == "min" ? "btnColor" : "";
  },
  data() {
    return {
      type: "normal",
      playerMode: playerMode
    };
  },
  methods: {
    changeSize() {
      if (this.type == "normal") {
        this.type = "min";
      } else {
        this.type = "normal";
      }
      this.playerMode.setData({
        type: this.type
      });
      // document.querySelector(".player-cover").classList.add("player-cover-min");
      // document
      //   .querySelector(".player-progress")
      //   .classList.add("player-progress-min");
      // document
      //   .querySelector(".player-controls")
      //   .classList.add("player-controls");
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
