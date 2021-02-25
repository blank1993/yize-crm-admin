<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <template v-for="(item,index) in levelList">
        <el-breadcrumb-item v-if="item.meta.title" :key="item.path">
          <span
            v-if="item.redirect==='noredirect'||index===levelList.length-1"
            class="no-redirect"
          >{{ item.meta.title }}</span>
          <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // const first = matched[0]
      // if (first && first.name !== 'dashboard') {
      //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      // }
      this.levelList = this.$route.matched.filter((item) => item.name);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
