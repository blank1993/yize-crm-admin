<template>
  <div class="upload-div">
    <div class="text">{{ msg }}</div>
    <div class="text">服务器MAC地址为: {{ mac }}</div>
    <el-upload
      class="upload-demo"
      drag
      :show-file-list="false"
      :action="uploadUrl"
      :on-success="handleSuccess"
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>

export default {
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_BASE_URL}/admin/license/upload`,
      mac: this.$route.query.mac,
      msg: this.$route.query.msg,
    };
  },
  methods: {
    handleSuccess() {
      this.$msgbox.alert('上传成功,请返回系统重新尝试');
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-div{
  text-align: center;
  .text{
    font-size: 18px;
    margin: 20px;
  }
}
</style>
