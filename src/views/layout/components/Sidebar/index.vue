<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="project-name">
      <el-image class="icon" :src="require('@/assets/logo.png')" />
      <div v-if="!isCollapse" class="name">{{ projectName }}</div>
    </div>
    <el-menu
      :unique-opened="true"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      :background-color="colors.colorMenuBackground"
      :active-text-color="colors.colorMenuFontColor"
      :text-color="colors.colorMenuFontColor"
    >
      <sidebar-item
        v-for="(route,index) in permission_routers"
        :key="index"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import colors from '@/styles/variables.scss';
import SidebarItem from './SidebarItem.vue';

export default {
  components: { SidebarItem },
  data() {
    return {
      colors,
    };
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
    ]),
    routes() {
      return this.$router.options.routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    projectName() {
      return this.$store.state.app.license.sysName;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .project-name {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    height: 70px;
    font-weight: bold;
    color: $color-menu-font-color;
    background-color: $color-menu-background;

    .icon {
      width: 25px;
      height: 25px;
    }

    .name {
      font-size: 15px;
      margin-left: 10px;
    }
  }
</style>
