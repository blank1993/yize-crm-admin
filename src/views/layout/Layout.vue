<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <tags-view />
      <app-main />
    </div>
  </div>
</template>

<script>
import {
  Navbar, Sidebar, AppMain, TagsView,
} from '@/views/layout/components';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  min-width: 1240px;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
