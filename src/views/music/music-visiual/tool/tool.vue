<template>
  <div class="tool">
    <div class="pre" @click="handleClick('pre')">
      <img src="./pre.png" alt="">
    </div>
    <div class="next" @click="handleClick('next')">
      <img src="./next.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    handleClick(v) {
      this.$emit("changeValue", v);
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
.tool {
  position: absolute;
  width: 100%;
  height: 100%;
  .pre,
  .next {
    position: absolute;
    width: 34px;
    height: 66px;
    z-index: 999;
    img {
      width: 70%;
    }
  }

  .pre {
    left: 10px;
    top: 50%;
  }

  .next {
    right: 10px;
    top: 50%;
  }
}
</style>
