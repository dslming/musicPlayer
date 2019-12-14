<template>
  <div class="player">
    <!-- 顶部 -->
    <div class="top">
      <div class="back">
        <i class="fa fa-angle-down" :class="playIcon"></i>
      </div>
      <h1 class="title" v-html="currentSong.name"></h1>
      <h2 class="subtitle" v-html="currentSong.singer"></h2>
    </div>

    <!-- 中间 -->
    <div class="middle">
      <el-select v-model="value7" placeholder="着色器" @change="changeVisual">
        <el-option-group
          v-for="group in options3"
          :key="group.label"
          :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-option-group>
      </el-select>

      <component v-bind:is="currentComponent"></component>
    </div>

    <!-- 底部 -->
    <div class="bottom">
      <div class="operators">
        <div class="icon i-left">
          <i class="fa fa-backward"></i>
        </div>

        <div class="icon i-center">
          <i :class="playIcon" @click="togglePlaying"></i>
        </div>

        <div class="icon i-right">
          <i class="fa fa-forward"></i>
        </div>

      </div>

      <div class="tips">
        {{`${percent}%`}}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Select, OptionGroup, Option } from "element-ui";
// import musicVisual from "@/3d/MusicVisual";

Vue.use(Select);
Vue.use(OptionGroup);
Vue.use(Option);
export default {
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
  computed: {
    playIcon() {
      return this.playActive ? "fa fa-pause " : "fa fa-play";
    }
  },
  data() {
    return {
      playActive: false,
      percent: 0,
      currentComponent: "universe",
      currentSong: {
        name: "123",
        singer: "456"
      },
      options3: [
        {
          label: "自然科学",
          options: [
            {
              value: "universe",
              label: "宇宙"
            },
            {
              value: "wind",
              label: "风车"
            },
            {
              value: "light",
              label: "灯泡"
            },
            {
              value: "cat",
              label: "猫咪"
            },
            {
              value: "particles",
              label: "粒子"
            },
            {
              value: "wave",
              label: "波浪"
            },
            {
              value: "shader",
              label: "着色器"
            }
          ]
        },
        {
          label: "风景",
          options: [
            {
              value: "Chengdu",
              label: "开发中"
            }
          ]
        }
      ],
      value7: ""
    };
  },
  methods: {
    togglePlaying() {
      if (this.playActive == false) {
        musicVisual.lmaudio.play();
        this.playActive = true;
      } else {
        musicVisual.lmaudio.pause();
        this.playActive = false;
      }
    },
    changeVisual(value) {
      this.currentComponent = value;
      musicVisual.startAnimationFrame();
    }
  },
  created() {},
  mounted() {
    // musicVisual.lmaudio
    //   .loadAudio("https://dslming.github.io/resources/audio/music.mp3")
    //   .then(() => {});
    // musicVisual.lmaudio.addSubjectListener("process", pro => {
    //   this.percent = pro;
    // });
  }
};
</script>
<style lang='scss' scoped>
@import "@/common/scss/variable";
@import "@/common/scss/mixin";
.player {
  background-color: #ccc;
  width: 100%;
  height: 100%;
  position: relative;
}
.top {
  position: relative;
  background-color: rgba(1, 1, 1, 0.1);
  z-index: 99999999;
  height: 60px;
  width: 100%;
  float: left;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .fa-angle-down {
      display: block;
      padding: 5px 9px;
      font-size: 35px;
      color: $color-theme-l;
    }
  }
  .title {
    width: 70%;
    margin: 0 auto;
    padding-top: 10px;
    line-height: 20px;
    text-align: center;
    @include no-wrap();
    font-size: $font-size-large;
    font-weight: bold;
    color: $color-text-l;
  }
  .subtitle {
    width: 70%;
    margin: 0 auto;
    line-height: 20px;
    text-align: center;
    @include no-wrap();
    font-size: $font-size-small-x;
    color: $color-text-l;
  }
}

.middle {
  position: fixed;
  width: 100%;
  height: 100%;
}

.bottom {
  position: absolute;
  bottom: 0%;
  width: 100%;
  color: #fff;
  border-top: 1px solid red;
  // height: 70px;
  .progress-wrapper {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0px auto;
    padding: 10px 0;
    .time {
      color: $color-text-l;
      font-size: $font-size-small;
      flex: 0 0 30px;
      line-height: 30px;
      width: 30px;
      &.time-l {
        text-align: left;
      }
      &.time-r {
        text-align: right;
        color: $color-text-gg;
      }
    }
    .progress-bar-wrapper {
      flex: 1;
    }
  }
  .operators {
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    justify-content: space-between;

    .icon {
      flex: 1;
      color: $color-theme-l;
      &.disable {
        color: $color-theme;
      }
      i {
        font-size: 30px;
      }
      .mode {
        font-size: 25px;
      }
      &.i-left {
        text-align: right;
      }
      &.i-center {
        // padding: 0 20px;
        text-align: center;
        // i {
        //   // font-size: 40px;
        // }
      }
      &.i-right {
        text-align: left;
      }
      .icon-like {
        color: $color-sub-theme;
      }
    }
  }
}

.el-select {
  display: inline-block;
  position: absolute !important;
  z-index: 99999999;
  bottom: 20%;
  right: 5%;
  width: 100px;
}
</style>
