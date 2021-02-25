<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in Array.from(visitedViews)"
        ref="tag"
        :key="tag.path"
        class="tags-view-item"
        :class="isActive(tag)?'active':''"
        :to="{path: tag.path, query:tag.query}"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span
          v-if="!tag.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" class="contextmenu" :style="{left:left+'px',top:top+'px'}">
      <li
        v-if="!(selectedTag.meta&&selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)"
      >关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">全部所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane/index.vue';

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
  },
  watch: {
    $route() {
      this.addViewTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        window.addEventListener('click', this.closeMenu);
      } else {
        window.removeEventListener('click', this.closeMenu);
      }
    },
  },
  mounted() {
    this.addViewTags();
  },
  methods: {
    // generateTitle by vue-i18n
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch('addVisitedViews', route);
      return true;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view)
        .then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0];
            if (latestView) {
              this.$router.push({
                path: latestView.path,
                query: latestView.query,
              });
            } else {
              this.$router.push('/');
            }
          }
        });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.path);
      this.$store.dispatch('delOthersViews', this.selectedTag)
        .then(() => {
          this.moveToCurrentTag();
        });
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews');
      this.$router.push('/');
    },
    openMenu(tag, e) {
      this.visible = true;
      this.selectedTag = tag;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      this.left = e.clientX - offsetLeft + 15; // 15: margin right
      this.top = e.clientY;
    },
    closeMenu() {
      this.visible = false;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-container {
    .tags-view-wrapper {
      background: #fff;
      height: 52px;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);

      .tags-view-item {
        display: inline-block;
        position: relative;
        height: 34px;
        line-height: 34px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 15px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 10px;
        border-radius: 2px;
        transition: color .3s cubic-bezier(.645, .045, .355, 1),
        padding .3s cubic-bezier(.645, .045, .355, 1);

        &:first-of-type {
          margin-left: 15px;
        }

        &:hover {
          color: #1890ff;
        }

        &.active {
          background-color: #1890ff;
          color: #fff;
          border-color: #1890ff;

          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }

    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 2;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;

        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 14px;
        font-size: 12px;
        line-height: 14px;
        vertical-align: center;
        height: 14px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
