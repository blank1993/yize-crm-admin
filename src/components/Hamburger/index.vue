<template>
  <div @click="toggleClick">
    <i :class="[!isActive?'icon-outdent':'icon-indent']" class="iconfont hamburger" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    toggleClick: {
      type: Function,
      default: null,
    },
  },
};
</script>

<style scoped>
  .hamburger {
    padding: 0 12px;
    font-size: 20px;
    display: inline-block;
    vertical-align: middle;
  }

</style>
