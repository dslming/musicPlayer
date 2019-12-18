<template>
  <div class="wind">
    <wind-mill class="win1" :angleOut="angle1" winClass="win1" />
    <wind-mill class="win2" :angleOut="angle2" winClass="win2" />
    <div class="name">
      中国风车
    </div>
  </div>
</template>

<script>
import WindMill from "./windmill";
import logic from "../dist/002-wind/logic/Logic";
let that;
export default {
  components: { WindMill },
  data() {
    return {
      angle1: 0,
      angle2: 0
    };
  },
  mounted() {
    that = this;
    this.loop();
  },
  methods: {
    loop() {
      requestAnimationFrame(that.loop);
      if (logic.audio.subject.playing) {
        let v = logic.audio.getAverageFrequency();
        that.angle1 += Number.parseInt(v * 0.1);
        that.angle2 += Number.parseInt(v * 0.05);
        if (that.angle1 > 10000) that.angle1 = 0;
        if (that.angle2 > 10000) that.angle2 = 0;
      } else {
        that.angle1 = that.angle2 = 0;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.name {
  font-family: "china";
  position: absolute;
  bottom: 40px;
  left: 30px;
  font-size: 60px;
  color: #000;
}

.wind {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .win1,
  .win2 {
    position: absolute;
  }

  .win1 {
    top: -30px;
    transform: scale(0.5);
    left: 60px;
  }

  .win2 {
    top: 20px;
    right: 120px;
    transform: scale(0.8);
  }
}
</style>
