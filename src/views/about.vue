<template>
  <div class="app-container">
    <el-card class="app-container__card">
      <el-form label-width="220px">
        <el-form-item label="系统名称：">{{ lcInfo.sysName }}</el-form-item>
        <el-form-item label="系统版本：">{{ lcInfo.version }}</el-form-item>
        <el-form-item label="版权所有：">{{ lcInfo.copyRight }}</el-form-item>
        <el-form-item label="授权给：">{{ lcInfo.rightInfo }}</el-form-item>
        <el-form-item label="有效期：">{{ lcInfo.expiredDate }}</el-form-item>
        <el-form-item label="用户限制：">{{ lcInfo.userCount }}</el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  computed: {
    lcInfo() {
      return this.$store.state.app.license;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  background-color: #f6f8f9;

  &__card {
    margin: 0 auto;
    width: 800px;
  }
}
</style>
