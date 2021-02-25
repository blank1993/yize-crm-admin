<template>
  <div>
    <el-tooltip effect="dark" :content="isFullscreen?'退出全屏':'全屏'" placement="bottom">
      <i
        v-if="isFullscreen===true"
        class="screenfull iconfont icon-fullscreen-exit"
        @click="click"
      />
      <i
        v-if="isFullscreen===false"
        class="screenfull iconfont icon-fullscreen"
        @click="click"
      />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'Screenfull',
  props: {
    width: {
      type: Number,
      default: 22,
    },
    height: {
      type: Number,
      default: 22,
    },
    fill: {
      type: String,
      default: '#48576a',
    },
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$notify.warning('you browser can not work');
      }
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    },
  },
};
</script>

<style scoped>
  .screenfull{
    font-size: 26px;
    cursor: pointer;
  }
</style>
