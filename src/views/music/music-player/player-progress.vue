<template>
  <div class="player-progress" :class="myclass">
    <div class="progress__top">
      <div class="album-info" v-if="playerMode.currentTrack">
        <div class="album-info__name">{{ playerMode.currentTrack.artist }}</div>
        <div class="album-info__track">{{ playerMode.currentTrack.name }}</div>
      </div>
      <div class="progress__duration">{{ duration }}</div>
    </div>
    <div class="progress__bar" @click="clickProgress">
      <div class="progress__current" :style="{ width : barWidth }"></div>
    </div>
    <div class="progress__time">{{ currentTime }}</div>
  </div>
</template>

<script>
import playerMode from "./player-mode.js";
export default {
  components: {},
  computed: {
    myclass() {
      return this.playerMode.type == "min" ? "player-progress-min" : "";
    }
  },
  data() {
    return {
      playerMode: playerMode,
      duration: null,
      barWidth: null,
      currentTime: null
    };
  },
  methods: {
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
.player-progress {
  transition: all 0s ease;
  width: 100%;
  margin-top: -15px;
  user-select: none;
  &__top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__duration {
    color: #71829e;
    font-weight: 700;
    font-size: 20px;
    opacity: 0.5;
  }
  &__time {
    margin-top: 2px;
    color: #71829e;
    font-weight: 700;
    font-size: 16px;
    opacity: 0.7;
  }
}
.progress__bar {
  height: 6px;
  width: 100%;
  cursor: pointer;
  background-color: #d0d8e6;
  display: inline-block;
  border-radius: 10px;
}
.progress__current {
  height: inherit;
  width: 0%;
  background-color: #a3b3ce;
  border-radius: 10px;
}
.album-info {
  color: #71829e;
  flex: 1;
  padding-right: 60px;
  user-select: none;

  @media screen and (max-width: 576px), (max-height: 500px) {
    padding-right: 30px;
  }

  &__name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
    line-height: 1.3em;
    @media screen and (max-width: 576px), (max-height: 500px) {
      font-size: 18px;
      margin-bottom: 9px;
    }
  }
  &__track {
    font-weight: 400;
    font-size: 20px;
    opacity: 0.7;
    line-height: 1.3em;
    min-height: 52px;
    @media screen and (max-width: 576px), (max-height: 500px) {
      font-size: 18px;
      min-height: 50px;
    }
  }
}

.player-progress-min {
  position: absolute;
  top: 75px;
  right: 20px;
  width: 60%;
  .progress__top {
    .album-info {
      .album-info__name,
      .album-info__track {
        margin-bottom: 0;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 20px;
      }
    }
  }
  // margin-top: 0;
}
</style>
