<template>
  <div class="navBar">
    <el-menu class="navbar" mode="horizontal">
      <hamburger
        class="hamburger-container"
        :toggle-click="toggleSideBar"
        :is-active="!sidebar.opened"
      />
      <breadcrumb />
      <div class="right-menu">
        <screenfull class="right-menu-item" />

        <el-dropdown style="float: left">
          <span class="el-dropdown-link">
            <i class="iconfont icon-font-size right-menu-item" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changeZoom(1)">
              默认
            </el-dropdown-item>
            <el-dropdown-item @click.native="changeZoom(0)">
              小号
            </el-dropdown-item>
            <el-dropdown-item @click.native="changeZoom(2)">
              大号
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="avatar-container right-menu-item">
          <div class="avatar-wrapper">
            <img
              class="user-avatar"
              alt=""
              :onerror="setErrorImg"
              :src="require('@/assets/default_icon.png')"
            >
            <div class="user-name">{{ name }}</div>
          </div>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
    ]),
  },
  methods: {
    changeZoom(val) {
      document.body.style.zoom = 'normal'; // 避免zoom尺寸叠加
      let zoom = 1;
      if (val === 0) {
        zoom = 0.90;
      } else if (val === 1) {
        zoom = 1;
      } else if (val === 2) zoom = 1.05;
      document.body.style.zoom = zoom;
      this.$store.commit('SET_ZOOM_SIZE', zoom);
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    },
    logout() {
      this.$store.dispatch('FedLogOut')
        .then(() => {
          window.location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
    },
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      setErrorImg: `this.src="${require('@/assets/default_icon.png')}"`,
    };
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
  .navBar {
    .el-menu.el-menu--horizontal {
      border-bottom: 1px solid #f6f6f6;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 55px;
    line-height: 55px;
    border-radius: 0 !important;

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        float: left;
        font-weight: 600;
        padding: 0 8px;
        height: 100%;
        font-size: 26px;
        color: #606266;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }

      .international {
        vertical-align: top;
      }

      .theme-switch {
        vertical-align: 15px;
      }

      .avatar-container {
        margin-right: 20px;

        .avatar-wrapper {
          cursor: pointer;
          display: flex;
          align-items: center;
          align-content: center;
          justify-items: center;
          justify-content: center;

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }

          .user-name {
            margin-top: 2px;
            font-weight: normal;
            margin-left: 8px;
            font-size: 14px;
          }

        }
      }
    }
  }
</style>
