<template>
  <el-card class="box-card">
    <div
      slot="header"
    >
      <span>公告栏</span>
    </div>
    <div v-html="content" />
  </el-card>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      content: null,
    };
  },
  created() {
    this.content = { code: 0, msg: 'success', data: '<p>1、beta 2.0发布</p><p>2、使用vue-cli3重构</p><p>3、还有细节待处理</p>' }.data;
  },
  methods: {
  },
};
</script>
