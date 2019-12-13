<template>
  <div class="player__top">
    <player-cover />
    <player-controls />
  </div>
</template>

<script>
import playerMode from "./player-mode.js";
import PlayerCover from "./player-cover";
import PlayerControls from "./player-controls";
export default {
  components: { PlayerCover, PlayerControls },
  data() {
    return {
      playerMode: playerMode
    };
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
.player__top {
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 4;
  @media screen and (max-width: 576px), (max-height: 500px) {
    flex-wrap: wrap;
  }
}
</style>
