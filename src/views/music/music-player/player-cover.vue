<template>
  <div class="player-cover" ref="cover" :class="myclass">
    <transition-group :name="playerMode.transitionName">
      <div class="player-cover__item"
        :style="{ backgroundImage: `url(${playerMode.currentTrack.cover})`}"
        :key="playerMode.currentTrack.index">
      </div>
    </transition-group>
  </div>
</template>

<script>
import playerMode from "./player-mode.js";

export default {
  components: {},
  data() {
    return {
      playerMode: playerMode
    };
  },
  computed: {
    myclass() {
      return this.playerMode.type == "min" ? "player-cover-min" : "";
    }
  },
  methods: {},
  created() {
    let { tracks } = this.playerMode.getData();
    this.playerMode.setData({
      currentTrackIndex: 0
    });

    this.playerMode.setCurrentTrack({
      currentTrack: tracks[0]
    });
    this.playerMode.initAudio();
  }
};
</script>
<style lang='scss' scoped>
.player-cover {
  transition: all 0.2s ease;
  width: 300px;
  height: 300px;
  margin-left: -70px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  border-radius: 15px;
  // transform: perspective(512px) translate3d(0, 0, 0);
  // transition: all .4s cubic-bezier(.125, .625, .125, .875);
  z-index: 1;

  @media screen and (max-width: 576px), (max-height: 500px) {
    margin-top: -70px;
    margin-bottom: 25px;
    width: 250px;
    height: 250px;
    margin-left: auto;
    margin-right: auto;
  }

  &__item {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    position: absolute;
    left: 0;
    top: 0;

    &:before {
      content: "";
      background: inherit;
      width: 100%;
      height: 100%;
      box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
      display: block;
      z-index: 1;
      position: absolute;
      top: 30px;
      transform: scale(0.9);
      filter: blur(10px);
      opacity: 0.9;
      border-radius: 15px;
    }

    &:after {
      content: "";
      background: inherit;
      width: 100%;
      height: 100%;
      box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
      display: block;
      z-index: 2;
      position: absolute;
      border-radius: 15px;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
    user-select: none;
    pointer-events: none;
  }
}

.player-cover-min {
  width: 90px;
  height: 90px;

  flex-shrink: 0;
  position: relative;
  z-index: 2;
  border-radius: 15px;
  z-index: 1;
  top: 10px;
  left: 10px;
  margin: 0;
}

//scale out
.scale-out-enter-active {
  transition: all 0.35s ease-in-out;
}
.scale-out-leave-active {
  transition: all 0.35s ease-in-out;
}
.scale-out-enter {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}
.scale-out-leave-to {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}

//scale in
.scale-in-enter-active {
  transition: all 0.35s ease-in-out;
}
.scale-in-leave-active {
  transition: all 0.35s ease-in-out;
}
.scale-in-enter {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}
.scale-in-leave-to {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}
</style>
